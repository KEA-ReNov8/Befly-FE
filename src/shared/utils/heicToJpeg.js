import heic2any from 'heic2any';

export const HeicToJpeg = async ({ img }) => {
  const heicBlobArray = await heic2any({
    blob: img,
    toType: 'image/jpeg',
    quality: 0.8,
  });
  const heicBlob = Array.isArray(heicBlobArray) ? heicBlobArray[0] : heicBlobArray;
  const file = new File([heicBlob], `${img?.name.split('.')[0]}.jpeg`, {
    type: heicBlob.type,
  });
  return file;
};
