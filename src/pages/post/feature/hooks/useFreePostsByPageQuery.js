import { useQuery } from '@tanstack/react-query';
import { getFreePostsByPage } from '@shared/apis/post/free';

export const useFreePostsByPageQuery = (page) => {
  return useQuery({
    queryKey: ['freePosts', page],
    queryFn: () => getFreePostsByPage(page),
    keepPreviousData: true,
    staleTime: 1000 * 30,
    onError: (error) => {
      console.error(`자유함 ${page}페이지 패칭 실패`, error);
    },
    onSuccess: (data) => {
      console.log(`자유함 ${page}페이지 패칭 성공`, data);
    },
  });
};
