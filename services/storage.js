const crypto = require('crypto');
const multer = require('multer');
const mime = require('mime-types');

const storage = multer.diskStorage({
    destination: 'storage/uploads',
    filename: (req, file, cb) => {
        const name = crypto.createHash('md5').update(`${file.originalname}-${Date.now()}`).digest('hex');
        const extension = mime.extension(file.mimetype);
        return cb(null, `${name}.${extension}`);
    },
});

module.exports = multer({ storage });
