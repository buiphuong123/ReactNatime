const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    hira: {
        type: String,
        require: true,
    },
    kanji: {
        type: String,
        require: true,
    },
    vn: {
        type: String,
        require: true,
    },
}); 

module.exports = mongoose.model('Word', wordSchema);