const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const resetPassword = express.Router();

resetPassword.put('/resetPassword/:token', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user) {
        console.log(user);
        return res.json({error: 'account not exsist'});
    }
    else {
        console.log(user);
        console.log('vao username success');
        console.log(req.params.token);
        const resetToken = await User.findOne({resetPasswordToken: req.params.token});
        if(!resetToken) {
            return res.json({err: 'reset token error'});
        }
        else{
            const time = await User.findOne({resetPasswordExpires: { $gt: Date.now() } });
            if(!time) {
                return res.json({error: 'Password reset token has expired'});
            }
            else {
                user.password = await bcrypt.hash(req.body.password, 12);
                user.resetPasswordExpires = undefined;
                user.resetPasswordToken = undefined;
                user.save(function(error, user) {
                    if(error) {
                        return res.json({error: 'change password failed'});
                    }
                    else {
                        return res.json({success: 'change success', user});
                    }
                })
            }
        }
    }
});

module.exports = resetPassword;