import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useGetUserInfoQuery = (userId) => {
    return useQuery({
        queryKey: ['userInfo', userId],
        queryFn: async () => {
            try {
                const response = await apiInstance.get(`/user/profiles?userIds=${userId}`);
                console.log('유저 정보 API 응답:', response.data);
                
                // result.users 배열에서 첫 번째 사용자 정보 반환
                const userData = response.data?.result?.users?.[0];
                console.log('파싱된 유저 데이터:', userData);
                
                return userData || null;
            } catch (error) {
                const axiosError = AxiosError.from(error);
                const status = axiosError?.response?.status;
                console.log('유저 정보 조회 실패:', status);
                return null;
            }
        },
        enabled: !!userId,
    });
};
