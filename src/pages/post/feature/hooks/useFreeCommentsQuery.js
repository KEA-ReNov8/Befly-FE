import { useQuery } from '@tanstack/react-query';
import { getFreeComments } from '@shared/apis/post/comment';

export const useFreeCommentsQuery = (freeId) => {
  return useQuery({
    queryKey: ['freeComments', freeId],
    queryFn: () => getFreeComments(freeId),
    enabled: !!freeId,
    staleTime: 1000 * 60 * 3, // 3분 동안 fresh 상태 유지
    retry: 1,
    retryDelay: 1000,
    onError: (error) => {
      console.error('자유글 댓글 패칭 실패:', error);
    },
    onSuccess: (data) => {
      console.log('자유글 댓글 패칭 성공:', data);
    },
  });
};
