const express = require('express');
const router = express.Router();

const hasTeam = require('../middleware/hasTeam');
const checkResultStore = require('../middleware/validators/checkResultStore');
const ResultsController = require('../controllers/ResultsController');

router.post('/', hasTeam, checkResultStore, ResultsController.store);
router.delete('/', ResultsController.delete);

module.exports = router;
