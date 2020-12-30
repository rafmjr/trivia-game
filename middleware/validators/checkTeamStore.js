module.exports = (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({ error: 'Missing required parameter name' });
    }
    next();
};
