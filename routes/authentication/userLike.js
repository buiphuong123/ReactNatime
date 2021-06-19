const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Word = require('../../models/Word');
const UserLike = require('../../models/UserLike');

const usLike = express.Router();

usLike.post('/userLike', async (req, res) => {
    const {userId, wordId} = req.body;
    console.log(req.body);
    try {
        const newWordLike = new UserLike({userId, wordId});
        await newWordLike.save();
        console.log('new word like la' + newWordLike);
        const word = await UserLike.find({wordId: wordId, userId: userId}).populate("wordId");
        return res.json({message: 'Like success', userLike: word});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = usLike;