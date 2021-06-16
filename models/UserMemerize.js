const mongoose = require('mongoose');

const userMemerizeSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: "User"
    },
    
    wordId: {
        type: String,
        ref: "Word",
    },
}); 

module.exports = mongoose.model('UserMemerize', userMemerizeSchema);