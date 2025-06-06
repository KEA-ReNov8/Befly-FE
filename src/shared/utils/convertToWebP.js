import imageCompression from 'browser-image-compression';
import { HeicToJpeg } from '@shared/utils/heicToJpeg';

export const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1024,
  useWebWorker: true,
  fileType: 'image/webp',
};

const convertSingleImgToWebP = async ({ img }) => {
  let targetImage = img;

  if (img.name.toLowerCase().endsWith('.heic')) {
    const heicToJpegBlob = await HeicToJpeg({ img });

    if (heicToJpegBlob) {
      // HEIC → JPEG Blob → File 변환
      targetImage = blobToFile(heicToJpegBlob, img.name.replace(/\.heic$/i, '.jpg'));
    } else {
      return undefined;
    }
  }

  try {
    const webpBlob = await imageCompression(targetImage, options);
    return URL.createObjectURL(webpBlob);
  } catch (error) {
    console.error('이미지 압축/변환 실패:', error);
    return undefined;
  }
};

function blobToFile(blob, fileName) {
  return new File([blob], fileName, { type: blob.type });
}

const convertMultipleImgToWebP = async ({ img }) => {
  const fileEntries = Object.values(img);
  return await Promise.all(
    fileEntries.map(async (file) => {
      return await convertSingleImgToWebP({ img: file });
    }),
  );
};

export { convertSingleImgToWebP, convertMultipleImgToWebP };
