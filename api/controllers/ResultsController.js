const Result = require('../models/Result');

class ResultsController {
    static async store(req, res) {
        try {
            // let's store the result for the activity
            const result = await Result.create({ activity: req.body.activityId, solution: req.body.solution });
            // then assign it to the team
            req.team.results = [...req.team.results, result];
            req.team.save();
            // and send back successful response
            return res.status(201).send({ result });
        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
}

module.exports = ResultsController;
