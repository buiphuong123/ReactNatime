const mongoose = require('mongoose');

const wordExampleSchema = mongoose.Schema({
    wordId: {
        type: String,
        require: true,
    },
    
    examplejp: {
        type: Array,
        require: false,
    },
    examplevn: {
        type: String,
        require: false,
    },
}); 

module.exports = mongoose.model('WordExample', wordExampleSchema);