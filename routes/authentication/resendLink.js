const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const Token = require('../../models/Token');

var crypto = require('crypto');

const resendLink = express.Router();

resendLink.post('/resendLink', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
        // token is not found into database i.e. token may have expired 
        if (!user){
            return res.status(400).send({msg:'We were unable to find a user with that email. Make sure your Email is correct!'});
        }
        // user has been already verified
        else if (user.isVerified){
            return res.status(200).send('This account has been already verified. Please log in.');
    
        } 
        // send verification link
        else{
            // generate token and save
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save(function (err) {
                if (err) {
                  return res.status(500).send({msg:err.message});
                }
    
                // Send email (use credintials of SendGrid)
                    var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'buiphuongtan123@gmail.com', pass: 'susudangyeu12' } });
                    var mailOptions = { from: 'buiphuongtan123@gmail.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ user.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
                    transporter.sendMail(mailOptions, function (err) {
                       if (err) { 
                        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                     }
                    return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                });
            });
        }
        
});

module.exports = resendLink;