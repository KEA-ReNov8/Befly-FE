import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useCreateNewChatMutation = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    
    const createNewChatMutation = useMutation({
        mutationFn: async (data) => {
            const response = await apiInstance.post('/consult/chat/new', data);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('New chat created:', data);

            // 채팅 세션 목록 쿼리 무효화하여 사이드바 목록 갱신
            queryClient.invalidateQueries({ queryKey: ['chatList'] });

            const sessionInfo = data?.result;
            if (onSuccess && sessionInfo) {
                onSuccess(sessionInfo);
            }
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('채팅 세션 생성 실패:', status);

            if (status === 401 && axiosError.response?.data) {
                alert(axiosError.response.data.message);
            } else {
                alert('세션 생성 중 오류가 발생했습니다.');
            }
            
            if (onError) {
                onError(error);
            }
        },
    });
    return createNewChatMutation;
};
