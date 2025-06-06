import { apiInstance } from '@shared/apis/instance';

export const uploadImage = async (image, customImageKey = null) => {
  try {
    const imageKey = customImageKey || image.name;

    const { data } = await apiInstance.post('/user/upload/image', null, {
      params: { imageKey },
    });

    const result = data?.result;
    if (!result) {
      throw new Error('API 응답에 result가 없습니다.');
    }

    const presignedUrl = result.presignedUrl || result.presignedURL || result.preSignedUrl;
    const returnedImageKey = result.imageKey || result.image_key;

    if (!presignedUrl) {
      throw new Error('presignedUrl이 응답에 없습니다.');
    }

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: image,
    });

    if (!uploadResponse.ok) {
      throw new Error(`이미지 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`);
    }

    return {
      imageKey: returnedImageKey || imageKey,
      imageUrl: presignedUrl.split('?')[0],
    };
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    throw error;
  }
};
