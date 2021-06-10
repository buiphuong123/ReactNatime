const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
    hira: {
        type: String,
        require: false,
    },
    kanji: {
        type: String,
        require: false,
    },
    vn: {
        type: String,
        require: true,
    },
    amhan: {
        type: String, 
        require: false,
    },
    kata: {
        type: String, 
        require: false,
    },
    level: { // 5,4,3,2
        type: Number,
        require: true,
    },
    type: {  // hira(1), kanji(2), kata(3)
        type: Number,
        require: true,
    },
    typeWord: { // N, V, adj, adv
        type: String,
        require: false, 
    },
    verbGround: { // V nhom may 1,2,3
        type: Number,
        require: false,
    },
    typeVerb: {  // tu(1), tha(2)
        type: Number,
        require: false,
    },
    typeAdj: { // 1: i, 2: na
        type: Number,
        require: false,
    }

}); 

module.exports = mongoose.model('Word', wordSchema);