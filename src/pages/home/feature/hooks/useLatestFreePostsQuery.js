import { useQuery } from '@tanstack/react-query';
import { getLatestFreePosts } from '@shared/apis/post/free';

export const useLatestFreePostsQuery = () => {
  return useQuery({
    queryKey: ['latestFreePosts'],
    queryFn: getLatestFreePosts,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error('최신 자유함 게시글 패칭 실패', error);
    },
    onSuccess: (data) => {
      console.log('최신 자유함 게시글 패칭 성공', data);
    },
  });
};
