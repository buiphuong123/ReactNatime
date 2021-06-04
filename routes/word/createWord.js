const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');

const word = express.Router();

word.post('/createWord', async (req, res) => {
    const {hira, kanji, vn} = req.body;
    console.log(req.body);
    try {
        const newWord = new Word({hira, kanji, vn});
        await newWord.save();
        return res.json({message: 'Tao word thanh cong'});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = word;