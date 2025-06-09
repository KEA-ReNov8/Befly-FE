import { useInfiniteQuery } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';

export const useInfinitePostListQuery = (userId) => {
    return useInfiniteQuery({
        queryKey: ['infinitePostList', userId],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await apiInstance.get(`/community/solved/user/${userId}/page/${pageParam}`);
            console.log(response.data);
            return response.data;
        },
        getNextPageParam: (lastPage) => {
            const { result } = lastPage;          
            // 마지막 페이지가 아니면 다음 페이지 반환
            const nextPage = result.last ? undefined : result.number + 1;
            return nextPage;
        },
        select: (data) => {
            const allPosts = data.pages.flatMap(page => page.result.content);
            
            return {
                pages: data.pages,
                pageParams: data.pageParams,
                // 모든 페이지의 content를 하나로 합침
                posts: allPosts,
                // 총 개수 정보
                totalElements: data.pages[0]?.result?.totalElements || 0
            };
        },
        enabled: !!userId,
    });
};
