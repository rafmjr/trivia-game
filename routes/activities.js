const express = require('express');

const upload = require('../services/storage');
const auth = require('../middleware/auth');
const hasTeam = require('../middleware/hasTeam');
const checkActivityStore = require('../middleware/validators/checkActivityStore');
const ActivitiesController = require('../controllers/ActivitiesController');

const router = express.Router();

router.get('/', ActivitiesController.index);
router.get('/current', hasTeam, ActivitiesController.current);
router.get('/:activityId', ActivitiesController.show);

router.use(auth);

router.post('/', upload.single('picture'), checkActivityStore, ActivitiesController.store);
router.put('/:activityId', upload.single('picture'), checkActivityStore, ActivitiesController.update);
router.delete('/:activityId', ActivitiesController.delete);

module.exports = router;
