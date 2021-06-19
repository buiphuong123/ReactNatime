const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Word = require('../../models/Word');

const UserMemerize = require('../../models/UserMemerize');

const getuser = express.Router();

getuser.get('/listWordNotMemerize/:id', async (req, res) => {
    var id = req.params.id;
    var result ;
    var idnotlike = await UserMemerize.find({userId: id}, {wordId: 1, _id: 0});
    result = await Word.find({
        _id: {$nin: idnotlike.map(x => x.wordId)}

    });
    res.json({result});
});

   
module.exports = getuser;