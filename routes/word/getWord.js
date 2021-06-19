const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');
const UserLike = require('../../models/UserLike');
const UserMemerize = require('../../models/UserMemerize');
const getword = express.Router();

getword.get('/getWord/:id', async(req, res) => {
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
    // var id = req.params.id;
    // var wordlikes = await UserLike.find({userId: id}, {wordId: 1, isLike: 1, _id: 0});
    // var words = await Word.find({
    //     _id: {$in: wordlikes.map(x => x.wordId)}
    // })
    // res.json({words});

});

module.exports = getword;