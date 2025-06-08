import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteShareComment } from '@shared/apis/post/comment';

export const useDeleteShareCommentMutation = (shareId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteShareComment(shareId, commentId),
    onSuccess: async () => {
      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['shareComments', shareId] }),
        queryClient.invalidateQueries({ queryKey: ['sharePostDetail', shareId] }),
        queryClient.invalidateQueries({ queryKey: ['sharePostsByPage'] }),
        queryClient.invalidateQueries({ queryKey: ['latestSharePosts'] }),
      ]);
    },
    onError: (error) => {
      console.error('공유댓글 삭제 실패:', error);
    },
  });
};
