const mongoose = require('mongoose');

const userMemerizeSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    
    wordId: {
        type: String,
        require: true,
    },
}); 

module.exports = mongoose.model('UserMemerize', userMemerizeSchema);