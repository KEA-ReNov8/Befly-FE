// src/pages/post/feature/hooks/useUpdateShareCommentMutation.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShareComment } from '@shared/apis/post/comment';

export const useUpdateShareCommentMutation = (shareId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, postId, pcommentId, comment }) =>
      updateShareComment(shareId, commentId, { postId, pcommentId, comment }),
    onSuccess: () => {
      // 댓글 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['shareComments', shareId] });
    },
    onError: (error) => {
      console.error('공유댓글 수정 실패:', error);
    },
  });
};
