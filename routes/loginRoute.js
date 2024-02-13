const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { loadUsers } = require('../utils');

const router = express.Router();
const secretKey = 'test_key';
const upload = multer();

router.post('/api/login', upload.none(), (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
