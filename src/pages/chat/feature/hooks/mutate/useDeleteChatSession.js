import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useDeleteChatSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ( {statusField, sessionId} ) => {
            const response = await apiInstance.delete(`/consult/chat/${statusField}/${sessionId}`);
            console.log(response);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('채팅 세션 삭제 성공:', data);
            queryClient.invalidateQueries({ queryKey: ['chatList'] });
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('채팅 세션 삭제 실패:', status);

            if (status === 401 && axiosError.response?.data) {
                alert(axiosError.response.data.message);
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    });
};
