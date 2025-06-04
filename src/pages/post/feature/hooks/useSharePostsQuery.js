import { useQuery } from '@tanstack/react-query';
// import { getSharePosts } from '@shared/apis/post/share';
import { getMockSharePosts } from '@shared/apis/post/share'; // 더미 데이터 사용 aPi연결되면 위로 대체

export const useSharePostsQuery = (page = 0) => {
  return useQuery({
    queryKey: ['sharePosts', page],
    queryFn: () => getMockSharePosts(page),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error('공유글 패칭 실패', error);
    },
    onSuccess: (data) => {
      console.log('공유글 패칭 성공', data);
    },
  });
};
