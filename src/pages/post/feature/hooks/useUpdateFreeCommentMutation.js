import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFreeComment } from '@shared/apis/post/comment';

export const useUpdateFreeCommentMutation = (freeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, postId, pcommentId, comment }) =>
      updateFreeComment(freeId, commentId, { postId, pcommentId, comment }),
    onSuccess: () => {
      // 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['freeComments', freeId] });
    },
    onError: (error) => {
      console.error('댓글 수정 실패:', error);
    },
  });
};
