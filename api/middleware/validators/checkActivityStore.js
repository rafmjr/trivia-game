module.exports = (req, res, next) => {
    if (!req.body.question) {
        return res.status(400).send({ error: 'Missing required parameter question' });
    }
    next();
};
