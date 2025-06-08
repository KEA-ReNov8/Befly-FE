import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useLogoutMutation = (userId) => {
    return useMutation({
        mutationFn: async () => {
            const response = await apiInstance.post(`/auth/logout?userId=${userId}`);
            return response.data;
        },
        retry: false,
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('로그아웃 실패 (무시됨):', status);
        },
    });
};
