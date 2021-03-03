const express = require('express');
const auth = require('../middleware/auth');
const checkTeamStore = require('../middleware/validators/checkTeamStore');
const TeamsController = require('../controllers/TeamsController');

const router = express.Router();

router.get('/', auth, TeamsController.index);
router.post('/', checkTeamStore, TeamsController.store);
router.get('/current', TeamsController.current);

module.exports = router;
