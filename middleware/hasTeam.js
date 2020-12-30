const Team = require('../models/Team');

module.exports = async (req, res, next) => {
    if (!req.team) {
        return res.sendStatus(401);
    }

    next();
};
