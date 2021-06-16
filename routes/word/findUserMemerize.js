const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const UserMemerize = require('../../models/UserMemerize');

const getuser = express.Router();

getuser.get('/findUserMemerize/:id', async (req, res) => {
    var id = req.params.id;
    res.json(await UserMemerize.find({userId: id}).populate("wordId"));

});

module.exports = getuser;