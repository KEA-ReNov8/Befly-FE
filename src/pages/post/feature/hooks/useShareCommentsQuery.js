import { useQuery } from '@tanstack/react-query';
import { getShareComments } from '@shared/apis/post/comment';

export const useShareCommentsQuery = (shareId) => {
  return useQuery({
    queryKey: ['shareComments', shareId],
    queryFn: () => getShareComments(shareId),
    enabled: !!shareId,
    staleTime: 1000 * 60 * 3, // 3분 동안 fresh 상태 유지
    retry: 1,
    retryDelay: 1000,
    onError: (error) => {
      console.error('공유글 댓글 패칭 실패:', error);
    },
    onSuccess: (data) => {
      console.log('공유글 댓글 패칭 성공:', data);
    },
  });
};
