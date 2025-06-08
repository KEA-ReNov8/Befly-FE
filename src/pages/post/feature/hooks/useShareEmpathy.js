import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkShareEmpathy, postShareEmpathy, deleteShareEmpathy } from '@shared/apis/post/empathy';

export const useCheckShareEmpathyQuery = (shareId) => {
  return useQuery({
    queryKey: ['shareEmpathyCheck', shareId],
    queryFn: () => checkShareEmpathy(shareId),
    enabled: !!shareId,
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      console.error('❌ 공유글 공감 여부 확인 실패:', error);
    },
  });
};

export const useToggleShareEmpathyMutation = (shareId, isLiked) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isLiked) {
        return deleteShareEmpathy(shareId);
      } else {
        return postShareEmpathy(shareId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareEmpathyCheck', shareId] });
    },
    onError: (error) => {
      console.error('❌ 공유글 공감 토글 실패:', error);
    },
  });
};
