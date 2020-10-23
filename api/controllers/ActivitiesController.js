const Activity = require('../models/Activity');

class ActivitiesController {
    static async index(req, res) {
        const activities = await Activity.find({});
        res.send(activities);
    }

    static async show(req, res) {
        const activity = await Activity.findById(req.params.activityId);
        res.send(activity);
    }
}

module.exports = ActivitiesController;
