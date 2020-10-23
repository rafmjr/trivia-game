const express = require('express');
const router = express.Router();

const ActivitiesController = require('../controllers/ActivitiesController');

router.get('/', ActivitiesController.index);
router.get('/:activityId', ActivitiesController.show);

module.exports = router;
