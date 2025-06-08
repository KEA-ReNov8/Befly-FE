import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
//import { useSignupStore } from '@pages/login/feature/store/useSignupStore';

export const useSignupMutation = ({ onSuccess }) => {
    //const { clientId, password, nickName, photoUrl } = useSignupStore();

    const signupMutation = useMutation({
        mutationFn: async (body) => {
            const response = await apiInstance.post('/auth/signup', body);
            return response;
        },
        onSuccess: (reponse) => {
            console.log('회원가입이 완료되었습니다.');
            onSuccess?.();
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            
            if (status === 409 && axiosError.response?.data) {
                alert(axiosError.response.data.message);
            } else {
                alert('서버 오류가 발생했습니다.');
            }
            return false;
        },
    });
    return signupMutation;
};
