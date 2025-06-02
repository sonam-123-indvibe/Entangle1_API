// backend/middleware/uploadMiddleware.js

const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Uploads folder (publicly exposed)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // .jpg / .png
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Export middleware
const upload = multer({ storage: storage });
module.exports = upload;
