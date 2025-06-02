import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';

export const useLoginMutation = () => {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiInstance.post('/auth/signin', data);
            return response.data;
        },
        onSuccess: (data) => {            
            const { setIsLoggedIn, setIsFirstMount } = useIsLoggedInStore.getState();
            setIsLoggedIn(true);
            setIsFirstMount(false);

            setTimeout(() => {
                navigate('/');
            }, 500);
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;

            if (status === 401 && axiosError.response?.data) {
                alert(axiosError.response.data.message);
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        },
    });
    return loginMutation;
};
