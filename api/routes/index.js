const express = require('express');
const router = express.Router();

router.use('/teams', require('./teams'));
router.use('/results', require('./results'));
router.use('/activities', require('./activities'));

module.exports = router;
