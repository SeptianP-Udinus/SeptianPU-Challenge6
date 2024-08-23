// controllers/imageController.js
const { PrismaClient } = require('@prisma/client');
const { uploadToImageKit } = require('../utils/imageKit');
const prisma = new PrismaClient();

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
  }

  try {
    const { title, description } = req.body;
    const imageUrl = await uploadToImageKit(req.file);

    const newImage = await prisma.image.create({
      data: { title, description, imageUrl },
    });

    res.status(201).json({ message: 'Gambar berhasil diunggah', image: newImage });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengunggah gambar' });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil gambar' });
  }
};

const getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await prisma.image.findUnique({ where: { id: Number(id) } });
    if (!image) {
      return res.status(404).json({ error: 'Gambar tidak ditemukan' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil detail gambar' });
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.image.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Gambar berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus gambar' });
  }
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedImage = await prisma.image.update({
      where: { id: Number(id) },
      data: { title, description },
    });
    res.status(200).json({ message: 'Gambar berhasil diperbarui', image: updatedImage });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui gambar' });
  }
};

module.exports = {
  uploadImage,
  getImages,
  getImageById,
  deleteImage,
  updateImage,
};
