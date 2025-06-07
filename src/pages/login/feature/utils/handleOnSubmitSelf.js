import { uploadImage } from './uploadImage';
import { convertSingleImgToWebP } from '@/shared/utils/convertToWebP';

export const handleOnSubmitSelf = async (e, getValues, signupMutation) => {
    e.preventDefault();

    try {
        const { clientId, password, nickName } = getValues();

        const body = { clientId, password, nickName, loginType: 'INTERNAL' };

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
