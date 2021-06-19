const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const UserMemerize = require('../../models/UserMemerize');
mongoose.set('useFindAndModify', false);
const usnotMemerize = express.Router();

usnotMemerize.post('/userNotMemerize', async (req, res) => {
    const { userId, wordId } = req.body;
    const userNotMem = await UserMemerize.find({wordId: wordId, userId: userId}).populate("wordId");
   
    UserMemerize.findOneAndRemove({wordId: wordId, userId: userId}, function(err, doc) {
        if (!doc) return res.json({message: 'Khong co tu'});
        if(err) {
            console.log(err);
            return res.json({ message: 'remove err'});
        }
        else{
            return res.json({message: 'remove success', userNotMem});
        }
        
    });
    
    
});

module.exports = usnotMemerize;