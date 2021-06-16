const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const login = express.Router();

const JWT_SECRET = 'buiphuong123'
login.post('/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({username});
        if ( user) {
            if(await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                { 
                    id: user._id, 
                    username: user.username 
                }, 
                JWT_SECRET
            );
                return res.json({message: 'Login success', user: user});
            }
            else{
                return res.json({error: 'password fail'});
            }

        }
        else {
            return res.json({error: 'not found account'});
        }
    } catch (error) {
        return res.json({error});
    }
}
);

module.exports = login;