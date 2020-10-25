const Team = require('../models/Team');

module.exports = async (req, res, next) => {
    // check for the existence of the cookie
    const teamId = req.signedCookies.team;
    if (!teamId) {
        return res.sendStatus(401);
    }

    // try to find the corresponding team
    try {
        const team = await Team.findById(teamId);
        // the team was found, make it available through the request
        req.team = team;
    } catch (err) {
        // TODO: figure out logging, check https://www.npmjs.com/package/winston
        console.log(err);
        // clear the invalid cookie
        res.clearCookie('team');
        return res.status(500).send({ error: 'There was an error retrieving the team for your cookie' });
    }

    // moving on...
    next();
};
