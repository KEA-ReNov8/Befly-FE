import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFreePost } from '@shared/apis/post/free';

export const useCreateFreePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content, imageKeys }) => createFreePost({ title, content, imageKeys }),
    onSuccess: async (data) => {
      console.log('✅ 자유글 생성 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['freePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['latestFreePosts'] }),
      ]);

      // 첫 번째 페이지 강제 새로고침
      await queryClient.refetchQueries({ queryKey: ['freePosts', 0] });
    },
    onError: (error) => {
      console.error('❌ 게시글 등록 실패:', error);
    },
  });
};
