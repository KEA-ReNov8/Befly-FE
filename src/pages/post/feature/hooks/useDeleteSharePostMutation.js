import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSharePost } from '@shared/apis/post/share';

export const useDeleteSharePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSharePost,
    onSuccess: async (data, solvedId) => {
      console.log('✅ 공유글 삭제 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['sharePostsByPage'] }),
        queryClient.invalidateQueries({ queryKey: ['latestSharePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['postCount'] }),
        queryClient.invalidateQueries({ queryKey: ['searchSharePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['infinitePostList'] }),
      ]);

      // 삭제된 개별 게시글 쿼리도 제거
      queryClient.removeQueries({ queryKey: ['sharePostDetail', solvedId] });
    },
    onError: (error) => {
      console.error('❌ 공유글 삭제 실패:', error);
    },
  });
};
