import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkFreeEmpathy, postFreeEmpathy, deleteFreeEmpathy } from '@shared/apis/post/empathy';

export const useCheckFreeEmpathyQuery = (freeId) => {
  return useQuery({
    queryKey: ['freeEmpathy', freeId],
    queryFn: () => checkFreeEmpathy(freeId),
    enabled: !!freeId,
    staleTime: 1000 * 60 * 3,
  });
};

export const useToggleFreeEmpathyMutation = (freeId, isLiked) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: isLiked ? () => deleteFreeEmpathy(freeId) : () => postFreeEmpathy(freeId),

    // ✅ 낙관적 업데이트
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['freeEmpathy', freeId] });

      const prevLiked = queryClient.getQueryData(['freeEmpathy', freeId]);
      const prevPost = queryClient.getQueryData(['freePostDetail', freeId]);

      queryClient.setQueryData(['freeEmpathy', freeId], !prevLiked);

      if (prevPost) {
        queryClient.setQueryData(['freePostDetail', freeId], {
          ...prevPost,
          likes: prevPost.likes + (isLiked ? -1 : 1),
        });
      }

      return { prevLiked, prevPost };
    },

    // 실패 시 롤백
    onError: (err, _, context) => {
      if (context?.prevLiked !== undefined) {
        queryClient.setQueryData(['freeEmpathy', freeId], context.prevLiked);
      }
      if (context?.prevPost) {
        queryClient.setQueryData(['freePostDetail', freeId], context.prevPost);
      }
    },

    // 성공/실패 후 재검증
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['freeEmpathy', freeId] });
      queryClient.invalidateQueries({ queryKey: ['freePostDetail', freeId] });
    },
  });
};
