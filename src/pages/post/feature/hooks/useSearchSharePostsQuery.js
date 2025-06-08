import { useQuery } from '@tanstack/react-query';
import { searchSharePosts } from '@shared/apis/post/search';

export const useSearchSharePostsQuery = (page, keyword, category) => {
  return useQuery({
    queryKey: ['searchSharePosts', page, keyword, category],
    queryFn: () => searchSharePosts({ page, keyword, category }),
    enabled: !!(keyword?.trim() || (category && category !== '전체')), // 키워드나 카테고리가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    onError: (error) => {
      console.error('❌ 공유글 검색 실패:', error);
    },
  });
};
