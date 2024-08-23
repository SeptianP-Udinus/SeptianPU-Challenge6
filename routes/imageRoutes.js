// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  updateImage,
} = require('../controllers/imageController');

router.post('/images', upload.single('image'), uploadImage);
router.get('/images', getImages);
router.get('/images/:id', getImageById);
router.delete('/images/:id', deleteImage);
router.put('/images/:id', updateImage);

module.exports = router;
