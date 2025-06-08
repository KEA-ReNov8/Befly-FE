import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFreePost } from '@shared/apis/post/free';

export const useUpdateFreePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ freeId, title, content, imageKeys }) =>
      updateFreePost(freeId, { title, content, imageKeys }),
    onSuccess: async (data, variables) => {
      console.log('✅ 자유글 수정 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['freePostDetail', variables.freeId] }),
        queryClient.invalidateQueries({ queryKey: ['freePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['latestFreePosts'] }),
      ]);
    },
    onError: (error) => {
      console.error('❌ 게시글 수정 실패:', error);
    },
  });
};
