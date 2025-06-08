import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFreeComment } from '@shared/apis/post/comment';

export const useUpdateFreeCommentMutation = (freeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, postId, pcommentId, comment }) =>
      updateFreeComment(freeId, commentId, { postId, pcommentId, comment }),
    onSuccess: async () => {
      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['freeComments', freeId] }),
        queryClient.invalidateQueries({ queryKey: ['freePostDetail', freeId] }),
      ]);
    },
    onError: (error) => {
      console.error('댓글 수정 실패:', error);
    },
  });
};
