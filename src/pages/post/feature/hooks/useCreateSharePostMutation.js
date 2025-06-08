import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSharePost } from '@shared/apis/post/share';

export const useCreateSharePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSharePost,
    onSuccess: (data) => {
      console.log('✅ 공유글 생성 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: ['sharePostsByPage'] });
      queryClient.invalidateQueries({ queryKey: ['latestSharePosts'] });
    },
    onError: (error) => {
      console.error('❌ 공유글 생성 실패:', error);
    },
  });
};
