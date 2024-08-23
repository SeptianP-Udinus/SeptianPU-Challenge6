// utils/imageKit.js
const ImageKit = require('imagekit');
require('dotenv').config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadToImageKit = async (file) => {
  try {
    const result = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: '/images',
    });
    return result.url;
  } catch (error) {
    throw new Error('Gagal mengunggah gambar ke ImageKit');
  }
};

module.exports = { uploadToImageKit };
