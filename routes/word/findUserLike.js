const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const UserLike = require('../../models/UserLike');

const getuser = express.Router();

getuser.get('/findUserLike/:id', async (req, res) => {
    var id = req.params.id;
    res.json(await UserLike.find({userId: id}).populate("wordId"));
});


module.exports = getuser;