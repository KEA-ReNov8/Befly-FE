import { uploadImage } from './uploadImage';
import { convertSingleImgToWebP } from '@/shared/utils/convertToWebP';

export const handleOnSubmit = async (e, getValues, signupMutation) => {
    e.preventDefault();

    try {
        const { clientId, nickName } = getValues();
        const body = { clientId, password: '1234!@#$', nickName, loginType: 'KAKAO' };

        signupMutation.mutate(body);
    } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
    }
};
    /*let photoUrl = '';
    if (image.length > 0) {
        const convertedImage = await convertSingleImgToWebP({ img: image[0] });
        if (convertedImage) photoUrl = await uploadImage(image, convertedImage);
    }*/
