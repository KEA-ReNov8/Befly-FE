import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFreeComment } from '@shared/apis/post/comment';

export const useDeleteFreeCommentMutation = (freeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteFreeComment(freeId, commentId),
    onSuccess: async () => {
      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['freeComments', freeId] }),
        queryClient.invalidateQueries({ queryKey: ['freePostDetail', freeId] }),
        queryClient.invalidateQueries({ queryKey: ['freePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['latestFreePosts'] }),
      ]);
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
    },
  });
};
