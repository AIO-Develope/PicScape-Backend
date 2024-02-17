const express = require('express');
const { loadDatabase } = require('../utils');

const router = express.Router();

router.get('/api/account/images/:uuid', (req, res) => {
  const database = loadDatabase();
  const { uuid } = req.params;

  const imagesForUUID = database.images.filter(image => image.uuid === uuid);

  const response = imagesForUUID.map(image => ({ randomImage: image }));
  res.json(response);
});

module.exports = router;
