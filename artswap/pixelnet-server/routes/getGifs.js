var express = require('express');
var os = require('os');
var fs = require('fs');
var path = require('path');
var ifaces = os.networkInterfaces();
var router = express.Router();
const { GifUtil, BitmapImage, GifFrame } = require('gifwrap');
var targetFile = 'seq0.gif';
var Jimp = require('jimp');
//joining path of directory 
const directoryPath = path.join(__dirname, '../gifs');
router.get('/', function (req, res, next) {
  var pixelOrder = 'rgb';
  var rotation = 0;
  var paths = [];
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      res.json({success:false,reason:'Server error'});
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    var gifs = [];
    var promises = [];
    files.forEach(function (file) {
      gifs.push(file);
    });
    res.json({success:true, gifs:gifs})
   

  });
  /*
  parseGif(pixelOrder, rotation).then((jsonResult) => {
    res.json(jsonResult);
  })
  */
});

module.exports = router;
