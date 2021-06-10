const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const UserLike = require('../../models/UserLike');
mongoose.set('useFindAndModify', false);
const usDisLike = express.Router();

usDisLike.post('/userDisLike', async (req, res) => {
    const { userId, wordId } = req.body;
    const user = await UserLike.findOne({userId});
    if(user) {
        UserLike.findOneAndRemove({wordId: wordId, userId: userId}, function(err, doc) {
            if (!doc) return res.json({message: 'Khong co tu'});
            if(err) {
                console.log(err);
                return res.json({ message: 'remove err'});
            }
            else{
                return res.json({message: 'remove success'});
            }
            
        });
    }
    else {
        return res.json({message: 'remove error'});

    }
});

module.exports = usDisLike;