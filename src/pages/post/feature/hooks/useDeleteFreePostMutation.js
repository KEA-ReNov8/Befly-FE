import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFreePost } from '@shared/apis/post/free';

export const useDeleteFreePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (freeId) => deleteFreePost(freeId),
    onSuccess: async (data, freeId) => {
      console.log('✅ 자유글 삭제 성공:', data);

      // 관련 쿼리 무효화하여 최신 데이터 반영
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['freePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['latestFreePosts'] }),
        queryClient.invalidateQueries({ queryKey: ['freePostList'] }),
        queryClient.invalidateQueries({ queryKey: ['postCount'] }),
        queryClient.invalidateQueries({ queryKey: ['searchFreePosts'] }),
      ]);

      // 삭제된 개별 게시글 쿼리도 제거
      queryClient.removeQueries({ queryKey: ['freePostDetail', freeId] });
    },
    onError: (error) => {
      console.error('❌ 게시글 삭제 실패:', error);
    },
  });
};
