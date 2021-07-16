const { response } = require('express');
var express = require('express')
var multer  = require('multer')
const path = require('path');

const uploadImage = express.Router();

const storage = multer.diskStorage({
    destination: './Images',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ 
    storage: storage,
    // limits: {
    //   fileSize: 20
    // }
  })

uploadImage.use('/image', express.static('./Images'));

uploadImage.post('/uploadImage', upload.single('image'), (req, res) => {
    return res.json({
      success: 1, 
      image_url: `http://localhost:3001/image/${req.file.filename}`
    })
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
      res.json({
          success: 0,
          message: err.message
      })
  }
}
uploadImage.use(errHandler);

//multiple upload 
// uploadImageMulti.post('./uploadImageMulti', upload.array("images", 3), (req, res) => {
//   console.log(req.files);
//   res.send("Multiple file upload success");
// })
module.exports = uploadImage;