const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    question: String,
    answers: [String],
});

module.exports = mongoose.model('Activity', schema);
