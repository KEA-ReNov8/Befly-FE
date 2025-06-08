import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkFreeEmpathy, postFreeEmpathy, deleteFreeEmpathy } from '@shared/apis/post/empathy';

export const useCheckFreeEmpathyQuery = (freeId) => {
  return useQuery({
    queryKey: ['freeEmpathy', freeId],
    queryFn: () => checkFreeEmpathy(freeId),
    enabled: !!freeId,
    staleTime: 1000 * 60 * 3,
    onError: (error) => {
      console.error('❌ 자유글 공감 여부 확인 실패:', error);
    },
  });
};

export const useToggleFreeEmpathyMutation = (freeId, isLiked) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isLiked) {
        return deleteFreeEmpathy(freeId);
      } else {
        return postFreeEmpathy(freeId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freeEmpathyCheck', freeId] });
    },
    onError: (error) => {
      console.error('❌ 자유글 공감 토글 실패:', error);
    },
  });
};
