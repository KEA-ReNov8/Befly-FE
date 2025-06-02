import { apiInstance } from '@shared/apis/instance';

export const uploadImage = async (blobURL, image) => {
    try { 
        const response = await fetch(blobURL);
        const blob = await response.blob();

        const { data } = await apiInstance.post('/user/upload/image', {
            imageKey: image.name,
        });

        const presignedUrl = data.result.presignedUrl;
        const imageUrl = data.result.imageUrl;

        const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            headers: { 'Content-Type': blob.type },
            body: blob,
        });

        if (!uploadResponse.ok) throw new Error(`업로드 실패: ${uploadResponse.statusText}`);

        //return presignedUrl.split('?')[0];//성공시 Url 반환
        return imageUrl;
    } catch (error) {
        console.error('이미지 업로드 실패:', error);
        return '';
    }
};
