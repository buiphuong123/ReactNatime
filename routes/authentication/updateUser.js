const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const update = express.Router();

// update.post('/updateUser', async (req, res) => {
//     const { id, username } = req.body;
//     User.findOne({_id: id}, function(err, foundObject) {
//         if(err) {
//             console.log(err);
//             return res.json({ message: 'user not exsits'});
//         } else {
//             if(username) {
//                 foundObject.username = username;
//             }
//             foundObject.save(function(err, updateObject) {
//                 if(err) {
//                     return res.json({ message: 'update err'});
//                 }
//                 else {
//                     res.send(updateObject);
//                 }
//             })
//         }
//     })
// });

update.put('/updateUser/:id', async (req, res) => {
    const {username, username1} = req.body;
    var id = req.params.id;
    if(username === username1){
        res.json({message : 'update success'});
    }
    const user = await User.findOne({username});
    if(user) {
        return res.json({error: 'tai khoan da ton tai'});
    }
    else {
        User.findOne({_id: id}, function(err, foundObject) {
            if(err) {
                console.log(err);
                return res.json({ error: 'user not exsits'});
            } else {
                if(username) {
                    foundObject.username = username;
                }
                foundObject.save(function(err, updateObject) {
                    if(err) {
                        return res.json({ error: 'update err'});
                    }
                    else {
                        return res.json({ message: 'update success'});
                    }
                })
            }
        })
    }
});

module.exports = update;