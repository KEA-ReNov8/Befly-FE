import { uploadImage } from './uploadImage';
import { convertSingleImgToWebP } from '@/shared/utils/convertToWebP';

export const handleOnSubmit = async (e, getValues, signupMutation) => {
    e.preventDefault();

    try {
        const { clientId, nickName } = getValues();

        /*let photoUrl = '';
        if (image.length > 0) {
            const convertedImage = await convertSingleImgToWebP({ img: image[0] });
            if (convertedImage) photoUrl = await uploadImage(image, convertedImage);
        }*/
        const photoUrl = null;
        const password = null;
        const body = { clientId, password, nickName, photoUrl };

        signupMutation.mutate(body);
    } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
    }
};
