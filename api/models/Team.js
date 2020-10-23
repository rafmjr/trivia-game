const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    results: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Result',
        },
    ],
});

module.exports = mongoose.model('Team', schema);
