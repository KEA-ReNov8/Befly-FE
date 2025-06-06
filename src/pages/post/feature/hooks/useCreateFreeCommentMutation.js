import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFreeComment } from '@shared/apis/post/comment';

export const useCreateFreeCommentMutation = (freeId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postFreeComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freeComments', freeId] });
    },
    onError: (error) => {
      console.error('댓글 등록 실패', error);
    },
  });
};
