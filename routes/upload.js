const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const uploadDir = path.join(__dirname, '../public/uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send('Error reading uploaded files');
    res.render('users/upload', { uploadedFiles: files });
  });
});
router.get('/', (req, res) => {
  const uploadDir = path.join(__dirname, '../public/uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send('Error reading uploaded files');

    res.render('users/upload', { uploadedFiles: files });
  });
});

module.exports = router;
