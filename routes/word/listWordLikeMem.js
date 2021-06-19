const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const UserMemerize = require('../../models/UserMemerize');
const UserLike = require('../../models/UserLike');
const Word = require('../../models/Word');

const getuser = express.Router();

getuser.get('/listWordLikeMem/:id', async (req, res) => {
    var id = req.params.id;
//    var mem = await UserMemerize.find({userId: id});
//    var result = await UserLike.find({
//        userId: id, 
//        wordId: {$in: mem.map(x => x.wordId)}
//    }).populate("wordId");
//    var onlyMem = await UserLike.find({userId: id});
//    var memer = await UserMemerize.find({
//        userId: id, 
//        wordId: {$nin: onlyMem.map(x => x.wordId)},
//    }).populate("wordId");
//    var onlyLike = await UserLike.find({
//        userId: id,
//        wordId: {$nin: mem.map(x => x.wordId)},
//    }).populate("wordId");
//    return res.json({result, memer, onlyLike});
    
UserLike.aggregate([
    {
        $lookup: {
            from: "userlikes",
            localField: "_id",
            foreignField: "wordId",
            as: "userlikes"
        }
    },
    { $unwind: "$userlikes"},
    {
        $lookup: {
            from: "usermemerizes",
            localField: "wordId",
            foreignField: "wordId",
            as: "usermemerizes"
        }
    },
    { $unwind: "$usermemerizes"},
    {
        $match: {
            $and: [{"userId": id}]
        }
    },
    {
        $project: {
            _id: 1,
            wordId:1,
            isLike: "$userlikes.isLike",
            isMemerize: "$usermemerizes.isMemerize",
        }
    }
], function(err, res) {
    if(err) throw err;
    console.log(res);
})

});

module.exports = getuser;