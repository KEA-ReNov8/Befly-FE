import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShareComment } from '@shared/apis/post/comment';

export const useUpdateShareCommentMutation = (shareId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, postId, pcommentId, comment }) =>
      updateShareComment(shareId, commentId, { postId, pcommentId, comment }),
    onSuccess: async () => {
      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['shareComments', shareId] }),
        queryClient.invalidateQueries({ queryKey: ['sharePostDetail', shareId] }),
      ]);
    },
    onError: (error) => {
      console.error('공유댓글 수정 실패:', error);
    },
  });
};
