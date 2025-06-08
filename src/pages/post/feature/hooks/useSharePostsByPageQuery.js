import { useQuery } from '@tanstack/react-query';
import { getSolvedPostsByPage } from '@shared/apis/post/share';

export const useSharePostsByPageQuery = (page, options = {}) => {
  return useQuery({
    queryKey: ['sharePostsByPage', page],
    queryFn: () => getSolvedPostsByPage(page),
    staleTime: 1000 * 60 * 1, // 1분 캐싱
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error(`공유함 ${page}페이지 패칭 실패`, error);
    },
    onSuccess: (data) => {
      console.log(`공유함 ${page}페이지 패칭 성공`, data);
    },
    ...options, // 추가 옵션을 덮어쓸 수 있도록
  });
};
