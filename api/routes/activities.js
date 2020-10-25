const express = require('express');
const router = express.Router();

const ActivitiesController = require('../controllers/ActivitiesController');
const hasTeam = require('../middleware/hasTeam');

router.get('/', ActivitiesController.index);
router.get('/current', hasTeam, ActivitiesController.current);
router.get('/:activityId', ActivitiesController.show);

module.exports = router;
