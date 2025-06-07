import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const usePostListQuery = (userId) => {
    return useQuery({
        queryKey: ['freePostList', userId],
        queryFn: async () => {
            try{
                const response = await apiInstance.get(`/community/free/user/${userId}`);
                return {
                    posts: response.data.result || [],
                    totalElements: response.data.result?.length || 0
                };
            } catch (error) {
                const axiosError = AxiosError.from(error);
                const status = axiosError?.response?.status;
                console.log('자유함 게시글 목록 조회 실패:', status);
                return {
                    posts: [],
                    totalElements: 0
                };
            }
        },
        enabled: !!userId,
        //staleTime: 1000 * 60 * 5,
        //retry: 2,
    });
};
