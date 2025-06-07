import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useProfileNicknameMutation = () => {
    return useMutation({
        mutationFn: async (nickname) => {
            const response = await apiInstance.put('/user/nickname', {
                nickName: nickname
            });
            return response.data;
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('닉네임 변경 실패:', status);
        },
    });
}; 
