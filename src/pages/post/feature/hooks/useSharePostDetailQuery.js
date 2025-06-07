import { useQuery } from '@tanstack/react-query';
import { getSharePostDetail } from '@shared/apis/post/share';

export const useSharePostDetailQuery = (shareId) => {
  return useQuery({
    queryKey: ['sharePostDetail', shareId],
    queryFn: () => getSharePostDetail(shareId),
    enabled: !!shareId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 1000,
    onError: (error) => {
      console.error('에러 발생:', error);
    },
    onSuccess: (data) => {
      console.log('공유함 게시글 상세 정보 패칭 성공:', data);
    },
  });
};
