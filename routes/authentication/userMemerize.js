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
        return res.json({message: 'Memerize success', usermemerize: newWordMemerize});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = usMemerize;