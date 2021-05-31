const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const register = express.Router();

register.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    console.log(req.body);
    // kiem tra xem user cho trong db chua
    try {
        const user = await User.findOne({username});
        if (user) return res.json({error: 'Tai khoan da ton tai'});
        const usermail = await User.findOne({email});
        if(usermail) return res.json({error: 'Email da duoc su dung'});
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        return res.json({message: 'Tao tai khoan thanh cong', user: newUser});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = register;