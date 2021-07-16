const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const Token = require('../../models/Token');
const forgot = express.Router();
var async = require('async');
var crypto = require('crypto');
forgot.post('/forgot', async (req, res) => {
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = Math.floor(Math.random() * 9999) + 1000;
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
            //   console.log('error', 'No account with that email address exists.');
            return res.json({error: 'No account with that email address exists.'});
            }
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTrans = nodemailer.createTransport({
             service: 'gmail', 
             auth: {
              user: process.env['MAIL_ADDRESS'],
              pass: process.env['MAIL_PASSWORD']
            }
          });
          var mailOptions = {
    
            to: user.email,
            from: process.env['MAIL_ADDRESS'],
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please check screat code the following to recover password\n\n' +
               + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    
          };
    
            smtpTrans.sendMail(mailOptions, function(err) {
            return res.json({success: 'An e-mail has been sent to ' + user.email + ' with further instructions.'})
    });
    }
      ], function(err) {
        console.log('this err' + ' ' + err);
        return res.json({error: err});
      });
});

module.exports = forgot;