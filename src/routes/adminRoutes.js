const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/fetch/getAccounts', adminController.getAccounts);


module.exports = router;
