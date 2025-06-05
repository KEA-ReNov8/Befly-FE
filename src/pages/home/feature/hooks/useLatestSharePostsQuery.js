import { useQuery } from '@tanstack/react-query';
import { getLatestSharePosts } from '@shared/apis/post/share';

export const useLatestSharePostsQuery = () => {
  return useQuery({
    queryKey: ['latestSharePosts'],
    queryFn: () => getLatestSharePosts(),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error('최신 공유함 게시글 패칭 실패', error);
    },
    onSuccess: (data) => {
      console.log('최신 공유함 게시글 패칭 성공', data);
    },
  });
};
