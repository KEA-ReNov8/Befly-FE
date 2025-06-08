import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';

export const useChatSessionListQuery = (status, enabled = true) => {
    // status에 따라 엔드포인트 결정
    const getEndpoint = (statusValue) => {
        if (statusValue === 'all') {
            return '/consult/chat/list/all';
        }
        // true/false 값을 그대로 사용
        return `/consult/chat/list/${statusValue}`;
    };

    return useQuery({
        queryKey: ['chatList', status], // status를 queryKey에 포함해서 캐싱 분리
        queryFn: async () => {
            const endpoint = getEndpoint(status);
            const response = await apiInstance.get(endpoint);
            return response.data;
        },
        enabled: enabled,
        //staleTime: 1000 * 60 * 5,
        //retry: 2,
    });
};
