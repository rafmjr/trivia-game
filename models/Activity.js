const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    question: String,
    answers: [String],
    picture: String,
});

module.exports = mongoose.model('Activity', schema);
