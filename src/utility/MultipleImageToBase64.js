import Resizer from 'react-image-file-resizer';

const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 300, 300, 'JPEG', 80, 0,
    uri => {
      resolve(uri);
    },
    'base64'
  );
});

const MultipleImageToBase64 = async (file) => {
  try {
    const resizedImage = await resizeFile(file);
    return resizedImage;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { MultipleImageToBase64 };
