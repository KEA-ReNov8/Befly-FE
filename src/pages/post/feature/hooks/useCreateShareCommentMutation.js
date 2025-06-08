import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postShareComment } from '@shared/apis/post/comment';

export const useCreateShareCommentMutation = (shareId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postShareComment(data),
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
      console.error('공유댓글 등록 실패', error);
    },
  });
};
