const express = require('express');
const mongoose = require('mongoose');
const Word = require('../../models/Word');

const createWord = express.Router();

createWord.post('/createWord', async (req, res) => {
    const {hira, kanji, vn, amhan, kata, level, type, typeWord, verbGround, typeVerb, typeAdj} = req.body;
    try {
        let newWord;
        const wordkata = await Word.findOne({kata});
        const wordhirakanji = await Word.findOne({hira, kanji});
        if(wordkata || wordhirakanji)
            return res.json({message: 'word da ton tai'});
        if (type==2 && typeWord == 'V'){
            newWord = new Word({hira, kanji, vn, type, level, amhan, verbGround, typeVerb, typeWord});
        }
        else if (type==2 && typeWord == 'ADJ'){
            newWord = new Word({hira, kanji, amhan, vn, type, level, amhan, typeAdj, typeWord});
        }
        else if (type == 2) {
            newWord = new Word({hira, kanji, vn, type, level, amhan, typeWord});
        }
        else if (type==1 && typeWord == 'V'){
            newWord = new Word({hira, vn, type, level, verbGround, typeVerb, typeWord});
        }
        else if (type==1 && typeWord == 'ADJ'){
            newWord = new Word({hira, vn, type, level, typeAdj, typeWord});
        }
        else if (type == 1) {
            newWord = new Word({hira, vn, type, level, typeWord});
        }
        else if (type==3 && typeWord == 'ADJ'){
            newWord = new Word({kata, vn, type, level, typeAdj, typeWord});
        }
        else if(type == 3) {
            newWord = new Word({kata, vn, type, level, typeWord});
        }
        
        await newWord.save();
        return res.json({message: 'Tao word thanh cong'});
    } catch (error) {
        return res.json({message: error});
    }

});

module.exports = createWord;