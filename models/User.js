// Model tuong duong voi may cai bang ay
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // dinh nghia cac truong du lieu
    username: {
        type: String,
        require: true,
    },
    // tuong tu voi cac truong du lieu con lai :))
    password: {
        type: String,//ma hoa pass the nao ti nua 2 cais thoi it the :))lm mau 
        require: true,
    },
});//tiep di 

module.exports = mongoose.model('User', userSchema); // the tom lai day laf bang user dugn roiok