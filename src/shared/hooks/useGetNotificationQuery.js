import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useGetNotificationQuery = () => {
    return useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            try {
                const response = await apiInstance.get('/community/notification');
                console.log('알림 API 응답:', response.data);
                
                // result 배열을 반환
                const notifications = response.data?.result || [];
                console.log('파싱된 알림 데이터:', notifications);
                
                return notifications;
            } catch (error) {
                const axiosError = AxiosError.from(error);
                const status = axiosError?.response?.status;
                console.log('알림 조회 실패:', status);
                return [];
            }
        },
        enabled: true,
    });
};
