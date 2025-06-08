import { useQuery } from '@tanstack/react-query';
import { searchFreePosts } from '@shared/apis/post/search';

export const useSearchFreePostsQuery = (page, keyword) => {
  return useQuery({
    queryKey: ['searchFreePosts', page, keyword],
    queryFn: () => searchFreePosts({ page, keyword }),
    enabled: !!keyword && keyword.trim().length > 0, // 키워드가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    onError: (error) => {
      console.error('❌ 자유글 검색 실패:', error);
    },
  });
};
