import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import useIsLoggedInStore from '@shared/store/useIsLoggedInStore';
import { useMyInfoStore } from '@shared/store/useMyInfoStore';
import { fetchMyInfo } from '@shared/apis/user/user';

export const useLoginMutation = () => {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiInstance.post('/auth/signin', data);
            return response.data;
        },
        onSuccess: async(data) => {            
            console.log('로그인 성공:', data);
            console.log('로그인 응답 전체 구조:', JSON.stringify(data, null, 2));
            
            const { setIsLoggedIn, setIsFirstMount } = useIsLoggedInStore.getState();
            const { setMyInfo } = useMyInfoStore.getState();
            
            setIsLoggedIn(true);
            setIsFirstMount(false);

            console.log('내 정보 요청 시작...');
            try {
                const myInfoResponse = await fetchMyInfo();
                console.log('내 정보 응답:', myInfoResponse);
                
                if (myInfoResponse?.result) {
                    setMyInfo(myInfoResponse.result);
                    console.log('내 정보 저장 완료:', myInfoResponse.result);
                } else {
                    console.warn('내 정보 응답에 result가 없음:', myInfoResponse);
                }
            } catch (error) {
                console.error('내 정보 가져오기 실패:', error);
                console.error('에러 상세:', error.response?.data);
            }
            
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
