import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFreeComment } from '@shared/apis/post/comment';

export const useDeleteFreeCommentMutation = (freeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteFreeComment(freeId, commentId),
    onSuccess: () => {
      // 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['freeComments', freeId] });
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
    },
  });
};
