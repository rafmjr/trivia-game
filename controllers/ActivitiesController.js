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
        const total = await Activity.estimatedDocumentCount();
        const pagination = { total, current: req.team.results.length + 1 };
        // if the team hasn't done any activities yet
        if (!req.team.results.length) {
            // get the first one available and return it
            const activity = await Activity.findOne({});
            return res.send({ activity, pagination });
        }
        // else, populate the results
        const team = await req.team.populate('results').execPopulate();
        // get the latest result
        const lastResult = team.results[team.results.length - 1];
        // find the next activity and return it
        const activity = await Activity.findOne({ _id: { $gt: lastResult.activity } });
        return res.send({ activity, pagination });
    }

    static async store(req, res) {
        const activity = await Activity.create({
            question: req.body.question,
            answers: req.body.answers,
            solution: req.body.solution,
            picture: req.file ? req.file.path : null,
        });
        return res.status(201).send({ activity });
    }

    static async update(req, res) {
        console.log('Picture Path', typeof req.body.picture);
        const activity = await Activity.updateOne(
            { _id: req.params.activityId },
            {
                question: req.body.question,
                answers: req.body.answers,
                solution: req.body.solution,
                picture: req.file ? req.file.path : req.body.picture === 'null' ? null : req.body.picture,
            }
        );
        return res.send({ activity });
    }

    static async delete(req, res) {
        await Activity.deleteOne({ _id: req.params.activityId });
        return res.sendStatus(204);
    }
}

module.exports = ActivitiesController;
