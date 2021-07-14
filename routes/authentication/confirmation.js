const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Token = require('../../models/Token');

const confirmation = express.Router();

confirmation.get('/confirmation/:email/:token', async (req, res) => {
    const token = await Token.findOne({ token: req.params.token });
    console.log(token);
        // token is not found into database i.e. token may have expired 
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user 
        else{
            User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                } 
                // user is already verified
                else if (user.isVerified){
                    return res.status(200).send('User has been already verified. Please Login');
                }
                // verify user
                else{
                    // change isVerified to true
                    user.isVerified = true;
                    user.save(function (err) {
                        // error occur
                        if(err){
                            return res.status(500).send({msg: err.message});
                        }
                        // account successfully verified
                        else{
                          return res.status(200).send('Your account has been successfully verified');
                        }
                    });
                }
            });
        }
        
    
});

module.exports = confirmation;