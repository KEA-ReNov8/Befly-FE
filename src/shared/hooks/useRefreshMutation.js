import { apiInstance } from '@shared/apis/instance'
import { useMutation } from '@tanstack/react-query'

export const useRefreshMutation = () => {
    const refreshMutation = useMutation({
        mutationFn: async () => {
            const response = await apiInstance.post ('/auth/refresh');
            return response.data;
        },
        onSuccess: (data) => {
            return data.result.accessToken;
        },
        onError: () => {
            /*alert(`토큰 갱신에 실패했습니다. ${error}`);*/
        },
    });
    return refreshMutation;
};
