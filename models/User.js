// Model tuong duong voi may cai bang ay
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // dinh nghia cac truong du lieu
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,//ma hoa pass the nao ti nua 2 cais thoi it the :))lm mau 
        require: true,
    },
}); 

module.exports = mongoose.model('User', userSchema); // the tom lai day laf bang user dugn roiok