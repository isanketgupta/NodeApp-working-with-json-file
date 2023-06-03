const path = require('path');

const express = require('express');
const multer = require('multer');


const downloadController = require('../controllers/download');
const uploadController = require('../controllers/upload');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.post('/upload', upload.single('file'), uploadController.uploadJSONFile);

router.get('/download', downloadController.downloadJSONFile);

router.get('/',  (req, res) => {
    res.render('index');
  });

module.exports = router;
