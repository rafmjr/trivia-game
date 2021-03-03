const fs = require('fs');

module.exports = function checkActivityStore(req, res, next) {
    if (!req.body.question || !req.body.solution) {
        if (req.file) {
            fs.unlink(req.file.path, console.log);
        }
        const error = `Missing required parameter ${req.body.question ? 'question' : 'solution'}`;
        return res.status(400).send({ error });
    }
    next();
};
