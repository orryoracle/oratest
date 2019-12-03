
var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var router = express.Router();
const { GifUtil, BitmapImage, GifFrame } = require('gifwrap');


router.post('/', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err);
      throw err;
    }
    var fileName = 'seq' + fields.index + '.gif';
    var file = files.file;
    GifUtil.read(file.path).then((inputGif) => {
      if (inputGif.width == 8 && inputGif.height == 8) {
        fs.copyFile(file.path, __dirname + '/../gifs/' + fileName, (err) => {
          if (err) {
            res.json({ success: false, reasons: ['Server error'] });
            throw err;
          }
          res.json({ success: true, src: '/gifs/' + fileName });
        });
      } else {
        res.json({ success: false, reasons: ['Currently only supports 8x8 pixels gifs'] });
      }
    })



    // console.log('files: ',files.file);
    // for (const file of Object.entries(files)) {
    //   console.log(file)
    // }
  });

})

module.exports = router;
