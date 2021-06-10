const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');
const User = require('../../models/User');

const getwordlike = express.Router();

getwordlike.get('/getWordLike', (req, res) => {
    Word.aggregate([
        {
            $lookup: {
                from : "userlikes",
                as: "userlikes",
                let: {wordId: "$_id"},
                pipeline: [
                    {$match: {$expr: {eq: ['$wordId', '$$wordId']}}}
                ]
            }
        },
        {
            $project: {
                _id: 1,
                hira: 1,
                kanji: 1, 
                vn: 1,
                amhan: 1,
                kata: 1, 
                level: 1, 
                type: 1, 
                typeWord: 1,
                verbGround: 1,
                typeVerb: 1,
                typeAdj: 1
            }
        }

    ]).exec((err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.send({
                error: false,
                data: result,
            })
        }
    })

});

module.exports = getwordlike;