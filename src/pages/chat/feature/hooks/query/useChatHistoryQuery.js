import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useChatHistoryQuery = (sessionId, enabled = true) => {
    return useQuery({
        queryKey: ['chatHistory', sessionId],
        queryFn: async () => {
            try{
                const response = await apiInstance.get(`/consult/chat/history/${sessionId}`);
                return response.data;
            } catch (error) {
                const axiosError = AxiosError.from(error);
                const status = axiosError?.response?.status;
                console.log('채팅 내역 조회 실패:', status);

                if (status === 401 && axiosError.response?.data) {
                    alert(axiosError.response.data.message);
                } else {
                    alert('서버 오류가 발생했습니다.');
                }
            }
        },
        enabled: enabled && !!sessionId,
        staleTime: 0,
        refetchOnMount: 'always',
        //retry: 2,
    });
};
