import { useMutation } from '@tanstack/react-query';
import { updateFreePost } from '@shared/apis/post/free';

export const useUpdateFreePostMutation = () => {
  return useMutation({
    mutationFn: ({ freeId, title, content, imageKeys }) =>
      updateFreePost(freeId, { title, content, imageKeys }),
    onError: (error) => {
      console.error('❌ 게시글 수정 실패:', error);
    },
  });
};
