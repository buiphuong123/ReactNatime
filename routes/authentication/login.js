const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const login = express.Router();

login.post('/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({username});
        if ( user) {
            if(await bcrypt.compare(password, user.password)) {
                return res.json({message: 'Login success'});
            }
            else{
                return res.json({message: 'password fail'});
            }

        }
        else {
            return res.json({message: 'not found account'});
        }
    } catch (error) {
        return res.json({error});
    }
}
);

module.exports = login;