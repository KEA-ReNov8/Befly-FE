import { useMutation } from '@tanstack/react-query';
import { updateSharePost } from '@shared/apis/post/share';

export const useUpdateSharePostMutation = () => {
  return useMutation({
    mutationFn: ({ solvedId, title, content, imageKeys }) =>
      updateSharePost(solvedId, { title, content, imageKeys }),
    onError: (error) => {
      console.error('❌ 공유글 수정 실패:', error);
    },
  });
};
