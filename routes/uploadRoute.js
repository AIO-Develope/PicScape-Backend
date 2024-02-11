const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp'); 
const utils = require('../utils');

const router = express.Router();
const imagesFolder = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesFolder + '/');
  },
  filename: (req, file, cb) => {
    const id = Math.floor(10000 + Math.random() * 90000);
    const filename = `${id}${path.extname(file.originalname)}`;
    cb(null, filename);
    req.generatedId = id;
  },
});

const upload = multer({ storage });

router.post('/api/upload', upload.single('file'), async (req, res) => { 
  const { title, description, tags } = req.body;
  const id = req.generatedId;

  
  const inputFile = `${imagesFolder}/${id}${path.extname(req.file.originalname)}`;
  const outputFile = `${imagesFolder}/${id}.png`;
  await sharp(inputFile).toFormat('png').toFile(outputFile);

  const database = utils.loadDatabase();
  const filename = `${id}.png`; 
  const date = utils.getCurrentFormattedDate();

  database.images.push({ id, title, tags, description, filename, date });
  utils.saveDatabase(database);

  res.json({ message: 'Upload successful' });
});

module.exports = router;
