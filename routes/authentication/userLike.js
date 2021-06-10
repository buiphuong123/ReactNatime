const express = require('express');
const mongoose = require('mongoose');
const UserLike = require('../../models/UserLike');

const usLike = express.Router();

usLike.post('/userLike', async (req, res) => {
    const {userId, wordId} = req.body;
    console.log(req.body);
    try {
        const newWordLike = new UserLike({userId, wordId});
        await newWordLike.save();
        return res.json({message: 'Like success'});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = usLike;