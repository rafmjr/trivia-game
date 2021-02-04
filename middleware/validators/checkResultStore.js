module.exports = (req, res, next) => {
    if (!req.body.activityId) {
        return res.status(400).send({
            error: `Missing required parameter activityId`,
        });
    }
    next();
};
