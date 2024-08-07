const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImageController');


router.get('/data/:imgId', ImageController.getUploadData);
router.get('/view/:imgId', ImageController.viewUpload);
router.get('/search', ImageController.searchUploads);
router.get('/newest', ImageController.getNewestUploads);
router.delete('/delete/:imgId', ImageController.deleteUpload);
router.get('/myscape', ImageController.getUploadsFromUser);
router.get('/stats', ImageController.getServerStats); 

module.exports = router;
