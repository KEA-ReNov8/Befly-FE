import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const usePostCountQuery = (userId) => {
    return useQuery({
        queryKey: ['postCount', userId],
        queryFn: async () => {
            try {
                const [solvedResponse, freeResponse, chatResponse] = await Promise.all([
                    apiInstance.get(`/community/solved/user/${userId}/page/0`),
                    apiInstance.get(`/community/free/user/${userId}`),
                    apiInstance.get(`/consult/chat/list/all`)
                ]);
                return {
                    solved: solvedResponse.data.result?.totalElements || 0,
                    free: freeResponse.data.result?.length || 0,
                    chat: chatResponse.data.result?.length || 0
                };
            } catch (error) {
                const axiosError = AxiosError.from(error);
                const status = axiosError?.response?.status;
                console.log('게시글 개수 조회 실패:', status);
                return {
                    solved: 0,
                    free: 0,
                    chat: 0
                };
            }
        },
        enabled: !!userId,
    });
};
