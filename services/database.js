const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', onConnectionOpen);

/**
 * Load all the models once the connection is established
 */
function onConnectionOpen() {
    fs.readdirSync(path.resolve(__dirname, '../', 'models')).forEach(function (file) {
        require(`../models/${file}`);
    });
    console.log('Database connection successful');
}

module.exports = db;
