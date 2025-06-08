import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSharePost } from '@shared/apis/post/share';

export const useCreateSharePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSharePost,
    onSuccess: async (data) => {
      console.log('✅ 공유글 생성 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sharePostsByPage'] }),
        queryClient.invalidateQueries({ queryKey: ['latestSharePosts'] }),
      ]);

      // 첫 번째 페이지 강제 새로고침
      await queryClient.refetchQueries({ queryKey: ['sharePostsByPage', 0] });
    },
    onError: (error) => {
      console.error('❌ 공유글 생성 실패:', error);
    },
  });
};
