import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';

export const useGetReportQuery = (sessionId) => {
    return useQuery({
        queryKey: ['report', sessionId],
        queryFn: () => apiInstance.get(`/consult/chat/evaluate/result/${sessionId}`),
        enabled: !!sessionId,
    });
};
