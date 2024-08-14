const CLOUDINARY_CLOUD = import.meta.env.VITE_FACEBOOK_CLODINARY_CLOUD || 'http://192.168.0.1:1000/';

export const resize = ( imgString, size ) => {
  const imageUrl = CLOUDINARY_CLOUD + imgString + '.jpg'
  const imageResized = size 
    ? [imageUrl.slice(0, 52), `w_${ size }/` ,imageUrl.slice(52)]
    : [imageUrl.slice(0, 52), imageUrl.slice(52)]

  return imageResized.join('');
}