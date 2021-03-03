const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    activity: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
    solution: String,
});

module.exports = mongoose.model('Result', schema);
