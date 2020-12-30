const fs = require('fs');

module.exports = function checkActivityStore(req, res, next) {
    if (!req.body.question) {
        if (req.file) {
            fs.unlink(req.file.path, console.log);
        }
        return res.status(400).send({ error: 'Missing required parameter question' });
    }
    next();
};
