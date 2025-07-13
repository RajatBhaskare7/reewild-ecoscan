const express = require('express');
const multer = require('multer');
const router = express.Router();
const { analyzeImage } = require('../controllers/imageController');

const upload = multer({ dest: 'uploads/' });

router.post('/analyze', upload.single('image'), analyzeImage);

module.exports = router;