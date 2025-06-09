import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@shared/apis/image/uploadImage';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: ({ image, imageKey }) => uploadImage(image, imageKey), // ✅ 객체로 받아서 각각 전달
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
    },
  });
};
