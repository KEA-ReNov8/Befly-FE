import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/apis/instance';
import { AxiosError } from 'axios';

export const useProfileImageMutation = () => {
    return useMutation({
        mutationFn: async (imageUrl) => {
            console.log('이미지 업로드 결과:', imageUrl);
            const response = await apiInstance.put('/user/profile/image', {
                imageUrl: imageUrl
            });
            return response.data;
        },
        onError: (error) => {
            const axiosError = AxiosError.from(error);
            const status = axiosError?.response?.status;
            console.log('프로필 이미지 변경 실패:', status);
        },
    });
};
