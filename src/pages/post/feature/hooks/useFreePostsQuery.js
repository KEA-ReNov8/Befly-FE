import { useQuery } from '@tanstack/react-query';
// import { getFreePosts } from '@shared/apis/post/free';
import { getMockFreePosts } from '@/shared/apis/post/free';

// 자유함 게시글 목록을 패칭하는 커스텀 훅
// getFreePosts에서 이미 cardImage(대표 이미지) 필드를 반환하므로 select 불필요
export const useFreePostsQuery = (page = 0) => {
  return useQuery({
    queryKey: ['freePosts', page],
    queryFn: () => getMockFreePosts(page), // 교채 필요
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error('자유함 게시글 패칭 실패', error);
    },
    onSuccess: (data) => {
      console.log('자유함 게시글 패칭 성공', data);
    },
  });
};
