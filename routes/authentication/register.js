const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const Token = require('../../models/Token');
const bcrypt = require('bcryptjs');

const register = express.Router();
var crypto = require('crypto');
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
        await newUser.save(function(err) {
            if(err) {
                return res.json({err});
            }
            // generate token and save
            var token = new Token({_userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
            console.log(token);
            token.save(function(err) {
                if(err) {
                    return res.json({err});
                }
                var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env['MAIL_ADDRESS'], pass: process.env['MAIL_PASSWORD'] } });
                var mailOptions = { from: process.env['MAIL_ADDRESS'], to: newUser.email, subject: 'Account Verification Link', text: 'Hello '+ newUser.username +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newUser.email + '\/' + token.token + '\n\nThank You!\n' };
                transporter.sendMail(mailOptions, function(err) {
                    if (err) {
                        return res.json({err});
                    }
                    return res.json({message: 'A verification email has been sent to ' + newUser.email + '. It will be expire after one day. If you not get verification Email click on resend token.'});
                });

            });

        });
        // return res.json({message: 'Tao tai khoan thanh cong', user: newUser});
    } catch (error) {
        return res.json({error});
    }

});

module.exports = register;