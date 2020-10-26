const express = require('express');
const router = express.Router();

const TeamsController = require('../controllers/TeamsController');
const checkTeamStore = require('../middleware/validators/checkTeamStore');
const hasTeam = require('../middleware/hasTeam');

router.post('/', checkTeamStore, TeamsController.store);
router.get('/current', TeamsController.current);

module.exports = router;
