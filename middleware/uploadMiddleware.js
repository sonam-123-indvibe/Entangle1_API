// middleware/uploadMiddleware.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine resource_type based on mimetype
    let resourceType = 'image';
    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    }

    return {
      folder: 'uploads',
      resource_type: resourceType,
      allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'avi'],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
