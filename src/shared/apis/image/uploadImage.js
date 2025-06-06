import { apiInstance } from '@shared/apis/instance';

export const uploadImage = async (image, customImageKey = null) => {
  try {
    const imageKey = customImageKey || image.name;
    console.log('🔍 업로드 요청 imageKey:', imageKey);

    const { data } = await apiInstance.post('/user/upload/image', null, {
      params: { imageKey },
    });

    console.log('🔍 API 응답:', data);

    const result = data?.result;
    if (!result) {
      throw new Error('API 응답에 result가 없습니다.');
    }

    // 모든 가능한 키 이름 확인
    console.log('🔍 result의 모든 키:', Object.keys(result));
    console.log('🔍 result 전체 JSON:', JSON.stringify(result, null, 2));

    // 다양한 가능한 키 이름으로 시도
    const presignedUrl =
      result.presignedUrl ||
      result.presignedURL ||
      result.preSignedUrl ||
      result.PreSignedUrl ||
      result.signedUrl;

    const returnedImageKey = result.imageKey || result.ImageKey || result.image_key;

    console.log('🔍 추출된 presignedUrl:', presignedUrl);
    console.log('🔍 추출된 imageKey:', returnedImageKey);

    if (!presignedUrl) {
      console.error('🚨 presignedUrl을 찾을 수 없음. 사용 가능한 키들:', Object.keys(result));
      throw new Error('presignedUrl이 응답에 없습니다.');
    }

    console.log('🔍 presignedUrl 수신:', presignedUrl);

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: image,
    });

    if (!uploadResponse.ok) {
      throw new Error(`이미지 업로드 실패: ${uploadResponse.status} ${uploadResponse.statusText}`);
    }

    console.log('✅ 이미지 업로드 성공');

    const finalResult = {
      imageKey: returnedImageKey || imageKey,
      imageUrl: presignedUrl.split('?')[0],
    };

    console.log('🔍 최종 반환값:', finalResult);
    return finalResult;
  } catch (error) {
    console.error('🚨 이미지 업로드 오류:', error);
    throw error;
  }
};
