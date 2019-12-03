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
// Jimp.read('x').then((img)=>{
//   img.bitmap
// })

var rotateFrame = (frameArr, rotation, pixelOrder, w, h, flag) => {
  var buffArray = [];

  for (let i = 0; i < frameArr.length; i++) {
    const componentArr = frameArr[i].slice();
    componentArr.push(255);
    buffArray.push(componentArr);
  }

  buffArray = [].concat(...buffArray);

  var buffer = Buffer.from(buffArray.slice());
  var bitmap = new BitmapImage(8, 8, buffer);
  var jImg = GifUtil.copyAsJimp(Jimp, bitmap);

  //rotate
  if (rotation == 1) {
    jImg.rotate(90);
    jImg.crop(0, 1, 8, 8);
  }
  if (rotation == 2) {
    jImg.rotate(180);
    jImg.crop(1, 1, 8, 8);
  }
  if (rotation == 3) {
    jImg.rotate(270);
    jImg.crop(1, 0, 8, 8);
  }

  frame = new GifFrame(jImg.bitmap);
  return processFrame(frame, pixelOrder, w, h);
}

var processFrame = (frame, pixelOrder, w, h) => {
  const buf = frame.bitmap.data;
  var frameArr = new Array(w * h);
  frame.scanAllCoords((x, y, bi) => {
    //normalize animated giff offset
    x += frame.xOffset;
    y += frame.yOffset;
    var index = x + (w * y);
    const r = buf[bi];
    const g = buf[bi + 1];
    const b = buf[bi + 2];
    var pixel = {
      r: r,
      g: g,
      b: b
    };
    frameArr[index] = pixelOrder == null ? [r, g, b] : [pixel[pixelOrder[0].slice()], pixel[pixelOrder[1].slice()], pixel[pixelOrder[2].slice()]];
  });

  return frameArr;
}

var parseGif = (path,pixelOrder, rotation) => {
  var framesArr = [];
  return new Promise((resolve, reject) => {
    GifUtil.read(path).then(inputGif => {
      var refFrame = inputGif.frames[0];
      var w = inputGif.width;
      var h = inputGif.height;
      var frIndex = 0;
      var lastMinIndex = 0;
      var lastMaxIndex = 0;
      var lastFrameArr = [];
      var delays = [];
      inputGif.frames.forEach(frame => {
        delays.push(frame.delayCentisecs);


        frameArr = processFrame(frame, pixelOrder, w, h);
        // frameArr = processFrame(frame,pixelOrder)
        //animated gifs use some diferential color saving for 
        //efficiency - we need to rebuild looking at previous 
        //frames
        for (let i = 0; i < frameArr.length; i++) {
          const colorVal = frameArr[i];
          if (colorVal == undefined) {
            frameArr[i] = lastFrameArr[i].slice();
          }
        }

        lastFrameArr = frameArr.slice();
        frIndex++;
        var rotated = rotateFrame(frameArr, rotation, null, w, h, frIndex == 3)
        framesArr.push([].concat(...rotated));
      });
      resolve({ pixels: framesArr, delays: delays, loop: inputGif.loops });
    });
  })
}


/* GET home page. */
router.get('/', function (req, res, next) {
  var pixelOrder = 'rgb';
  var rotation = 0;
  //led color order
  if (req.query.order) {
    //validate
    if (
      req.query.order.indexOf('r') > -1 && req.query.order.lastIndexOf('r') == req.query.order.indexOf('r') &&
      req.query.order.indexOf('g') > -1 && req.query.order.lastIndexOf('g') == req.query.order.indexOf('g') &&
      req.query.order.indexOf('b') > -1 && req.query.order.lastIndexOf('b') == req.query.order.indexOf('b') &&
      req.query.order.length == 3
    ) {
      pixelOrder = req.query.order;
    }
  }
  //rotation, 0:no rotation 1:90 2:180 3:270
  if (req.query.rotation) {
    rotation = parseInt(req.query.rotation) <= 3 ? parseInt(req.query.rotation) : 0;
  }

  //echo ip
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });


  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    var gifs = [];
    var promises = [];
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      // gifQueue.push(directoryPath+'/'+file)
      var promise = parseGif(directoryPath+'/'+file,pixelOrder,rotation);
      promise.then((result)=>{
        gifs.push(result);
      })
      promises.push(promise);
    });
    Promise.all(promises).then(()=>{
      res.json(gifs);
    })

  });
  /*
  parseGif(pixelOrder, rotation).then((jsonResult) => {
    res.json(jsonResult);
  })
  */
});

module.exports = router;
