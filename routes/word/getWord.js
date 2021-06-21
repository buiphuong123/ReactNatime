const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');

const getuser = express.Router();

getuser.get('/getWord/:id', async (req, res) => {
    var id = req.params.id;
Word.aggregate([
    {
        $lookup: {
            from: "userlikes",
            let: {user: "$userId", idd: "$_id"},
            pipeline: [
                {
                    $match: 
                    {
                        $expr: 
                        {
                            $and:
                            [
                                {$eq: ["$userId", id]},
                                {$eq: ["$$idd", "$wordId"]}
                            ]
                        }
                    }
                },
                { $project: { isLike: 1, _id: 0 } }
            ],
            as: "likes"
        }
        
    },
    {$lookup: {
        from: "usermemerizes",
        let: {user: "$userId", idd: "$_id"},
        pipeline: [
            {
                $match: 
                {
                    $expr: 
                    {
                        $and:
                        [
                            {$eq: ["$userId", id]},
                            {$eq: ["$$idd", "$wordId"]}
                        ]
                    }
                }
            },
            { $project: { isMemerize: 1, _id: 0 } }
        ],
        as: "memerizes"
    }},
], function(err, data) {
    if(err) {
        res.json({kq: 0, errMsg: err});
    }else {
        res.json(data);
    }
})

});

module.exports = getuser;