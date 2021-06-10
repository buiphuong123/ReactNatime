const mongoose = require('mongoose');

const userLikeSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    
    wordId: {
        type: String,
        require: true,
    },
}); 

module.exports = mongoose.model('UserLike', userLikeSchema);