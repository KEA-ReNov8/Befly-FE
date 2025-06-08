import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSharePost } from '@shared/apis/post/share';

export const useDeleteSharePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSharePost,
    onSuccess: (data, solvedId) => {
      console.log('✅ 공유글 삭제 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: ['sharePostsByPage'] });
      queryClient.invalidateQueries({ queryKey: ['latestSharePosts'] });

      // 삭제된 개별 게시글 쿼리도 무효화
      queryClient.removeQueries({ queryKey: ['sharePostDetail', solvedId] });
    },
    onError: (error) => {
      console.error('❌ 공유글 삭제 실패:', error);
    },
  });
};
