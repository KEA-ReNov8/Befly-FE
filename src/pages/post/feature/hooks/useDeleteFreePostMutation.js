import { useMutation } from '@tanstack/react-query';
import { deleteFreePost } from '@shared/apis/post/free';

export const useDeleteFreePostMutation = () => {
  return useMutation({
    mutationFn: (freeId) => deleteFreePost(freeId),
    onError: (error) => {
      console.error('❌ 게시글 삭제 실패:', error);
    },
  });
};
