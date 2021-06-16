const mongoose = require('mongoose');

const userLikeSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: "User"
    },
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
    }
    
   
}); 

module.exports = mongoose.model('UserLike', userLikeSchema);