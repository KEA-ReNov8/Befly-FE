import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';

export const useConsultResultQuery = (sessionId) => {
    return useQuery({
        queryKey: ['consultResult', sessionId],
        queryFn: async () => {
            const response = await apiInstance.get(`/consult/chat/evaluate/${sessionId}`);
            return response.data;
        },
        enabled: false,
        //staleTime: 1000 * 60 * 5,
        //retry: 2,
    });
};
