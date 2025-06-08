import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFreeComment } from '@shared/apis/post/comment';

export const useCreateFreeCommentMutation = (freeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postFreeComment(data),
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
      console.error('댓글 등록 실패', error);
    },
  });
};
