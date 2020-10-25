const Activity = require('../models/Activity');

class ActivitiesController {
    static async index(req, res) {
        const activities = await Activity.find({});
        res.send({ activities });
    }

    static async show(req, res) {
        const activity = await Activity.findById(req.params.activityId);
        if (!activity) return res.sendStatus(404);
        return res.send({ activity });
    }

    static async current(req, res) {
        // if the team hasn't done any activities yet
        if (!req.team.results.length) {
            // get the first one available and return it
            const activity = await Activity.findOne({});
            return res.send({ activity });
        }
        // else, populate the results
        const team = await req.team.populate('results').execPopulate();
        // get the latest result
        const lastResult = team.results[team.results.length - 1];
        // find the next activity and return it
        const activity = await Activity.findOne({ _id: { $gt: lastResult.activity } });
        return res.send({ activity });
    }
}

module.exports = ActivitiesController;
