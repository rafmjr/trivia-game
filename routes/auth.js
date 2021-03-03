const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.get('/auth', AuthController.check);

module.exports = router;
