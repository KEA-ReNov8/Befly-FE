import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSharePost } from '@shared/apis/post/share';

export const useUpdateSharePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ solvedId, title, content, imageKeys }) =>
      updateSharePost(solvedId, { title, content, imageKeys }),
    onSuccess: async (data, variables) => {
      console.log('✅ 공유글 수정 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sharePostDetail', variables.solvedId] }),
        queryClient.invalidateQueries({ queryKey: ['sharePostsByPage'] }),
        queryClient.invalidateQueries({ queryKey: ['latestSharePosts'] }),
      ]);
    },
    onError: (error) => {
      console.error('❌ 공유글 수정 실패:', error);
    },
  });
};
