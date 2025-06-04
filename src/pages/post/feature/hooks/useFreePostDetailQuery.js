import { useQuery } from '@tanstack/react-query';
import { getFreePostDetail } from '@shared/apis/post/free';

export const useFreePostDetailQuery = (freeId) => {
  return useQuery({
    queryKey: ['freePostDetail', freeId],
    queryFn: () => getFreePostDetail(freeId),
    enabled: !!freeId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 1000,
    onError: (error) => {
      console.error('에러 발생:', error);
    },
  });
};
