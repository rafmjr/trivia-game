const express = require('express');
const auth = require('../middleware/auth');
const hasTeam = require('../middleware/hasTeam');
const checkActivityStore = require('../middleware/validators/checkActivityStore');
const ActivitiesController = require('../controllers/ActivitiesController');

const router = express.Router();

router.get('/', ActivitiesController.index);
router.get('/current', hasTeam, ActivitiesController.current);
router.get('/:activityId', ActivitiesController.show);
router.post('/', auth, checkActivityStore, ActivitiesController.store);

module.exports = router;
