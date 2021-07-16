const nodemailer = require('nodemailer');
const express = require('express');
const cron = require('node-cron');

const mailRemind = express.Router();
mailRemind.post('/mailRemind', async (req, res) => {
    const { email, username, day, hour, minute } = req.body;
    const transporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            // user: 'buiphuongtan123@gmail.com', 
            user: process.env['MAIL_ADDRESS'], 
            pass: process.env['MAIL_PASSWORD'], 
        } 
    });
    const mailOptions = { 
        from: process.env['MAIL_ADDRESS'], 
        to: email, 
        subject: `Xin chào ${username}😇!Đến lúc học Tiếng Nhật rồi!Học một bài ngắn ngay nhé 🕚`, 
        text:  `Xin chào ${username}!Vào thăm app bạn nhé!Kiến tha lâu đầy tổ, học ngoại ngữ cũng đòi hỏi luyện tập từng chút một mỗi ngày🙂` 
    };

    cron.schedule(`${minute} ${hour} * * ${day}`, () => {
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error);
            }
            else {
                console.log('email send ' + info.response);
            }
        });
    });
});

module.exports = mailRemind;