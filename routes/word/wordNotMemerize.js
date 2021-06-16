const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');
const UserLike = require('../../models/UserLike');

const usNotMem = express.Router();

usNotMem.get('/wordNotMemerize/:id', async (req, res) => {
    var id = req.params.id;
    // const word = res.json(await UserMemerize.find({userId: id}).populate("wordId"));
    Word.aggregate([
        {
            $lookup: {
                from : "usermemerizes",
                as: "usermemerizes",
                let: {wordId: "$_id"},
                pipeline: [
                    {$match: {$expr: {ne: ['$wordId', '$$wordId']}}}
                ]
            }
        },
       
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

module.exports = usNotMem;