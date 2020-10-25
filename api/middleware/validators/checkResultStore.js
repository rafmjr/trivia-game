module.exports = (req, res, next) => {
    if (!req.body.activityId || !req.body.solution) {
        return res.status(400).send({
            error: `Missing required parameter ${!activityId ? 'activityId' : 'solution'}`,
        });
    }
    next();
};
