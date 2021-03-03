const Team = require('../models/Team');

module.exports = async (req, res, next) => {
    try {
        // if team was found, make it available through the request
        const team = await Team.findById(req.signedCookies.team);
        req.team = team;
    } catch (err) {
        // handling cases where cookie might be corrupted or team no longer exists
        res.clearCookie('team');
    }
    // moving on...
    next();
};
