const Team = require('../models/Team');

class TeamsController {
    static async index(req, res) {
        const teams = await Team.find({})
            .populate({ path: 'results', populate: { path: 'activity' } })
            .exec();
        return res.send({ teams });
    }

    static async store(req, res) {
        try {
            // create a team
            const team = await Team.create({ name: req.body.name });
            // TODO: auth via cookies should be implemented with CSRF tokens
            // give the user a cookie, teams will be used to simulate a session
            res.cookie('team', team._id, { signed: true });
            // send successful response
            return res.status(201).send({ team });
        } catch (err) {
            // TODO: check for error code and notify of duplicates
            return res.status(500).send({ error: err.message });
        }
    }

    static current(req, res) {
        return res.send({ team: req.team });
    }
}

module.exports = TeamsController;
