const mongoose = require('mongoose');

const userMemerizeSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: "User"
    },
    
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
    },
    isMemerize: {
        type: Boolean,
        default: true,
    },
    
}); 

module.exports = mongoose.model('UserMemerize', userMemerizeSchema);