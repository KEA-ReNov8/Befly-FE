import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteShareComment } from '@shared/apis/post/comment';

export const useDeleteShareCommentMutation = (shareId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteShareComment(shareId, commentId),
    onSuccess: () => {
      // 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['shareComments', shareId] });
    },
    onError: (error) => {
      console.error('공유댓글 삭제 실패:', error);
    },
  });
};
