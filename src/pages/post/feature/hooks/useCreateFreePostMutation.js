import { useMutation } from '@tanstack/react-query';
import { createFreePost } from '@shared/apis/post/free';

export const useCreateFreePostMutation = () => {
  return useMutation({
    mutationFn: ({ title, content, imageKeys }) => createFreePost({ title, content, imageKeys }),
    onError: (error) => {
      console.error('❌ 게시글 등록 실패:', error);
    },
  });
};
