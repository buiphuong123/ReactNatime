const express = require('express');
const mongoose = require('mongoose');
const UserMemerize = require('../../models/UserMemerize');

const usMemerize = express.Router();

usMemerize.post('/userMemerize', async (req, res) => {
    const {userId, wordId} = req.body;
    console.log(req.body);
    try {
        const newWordMemerize = new UserMemerize({userId, wordId});
        await newWordMemerize.save();
        const word = await UserMemerize.find({wordId: wordId, userId: userId}).populate("wordId");
        return res.json({message: 'Memerize success', usermemerize: word});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = usMemerize;