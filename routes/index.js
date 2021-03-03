const express = require('express');
const setTeam = require('../middleware/setTeam');
const router = express.Router();

router.use(setTeam);
router.use('/', require('./auth'));
router.use('/teams', require('./teams'));
router.use('/results', require('./results'));
router.use('/activities', require('./activities'));

module.exports = router;
