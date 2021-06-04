const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');

const getword = express.Router();

getword.get('/getWord', (req, res) => {
    Word.find()
    .then(result=>{
        res.status(200).json({
            wordData: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

});

module.exports = getword;