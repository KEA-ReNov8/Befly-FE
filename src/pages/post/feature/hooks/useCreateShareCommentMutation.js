import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postShareComment } from '@shared/apis/post/comment';

export const useCreateShareCommentMutation = (shareId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postShareComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareComments', shareId] });
    },
    onError: (error) => {
      console.error('공유댓글 등록 실패', error);
    },
  });
};
