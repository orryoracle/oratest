var setPassword = "artswap2019"
var history = require("connect-history-api-fallback");
var crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "aaffddaaff";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var getPixelsRouter = require('./routes/getPixels');
var getGifsRouter = require('./routes/getGifs');
var app = express();
const cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static("dist");

app.use('/getGifs', cors(), getGifsRouter);
app.use('/upload', cors(), uploadRouter);
app.use('/getPixels', cors(), getPixelsRouter);


//for simple password protection
app.post("/", function (req, res, next) {
  var cookies = req.cookies;
  if (encrypt(req.body.password) == encrypt(setPassword)) {
    //save
    res.cookie("secret", encrypt(setPassword));
    res.send(req.body.redirect);
  } else {
    res.send("error");
  }
});

/* GET home page. */
app.get("/*", function (req, res, next) {
  var cookies = req.cookies;

  if (cookies.secret === encrypt(setPassword)) {
    next();
  } else {
    res.render("auth", { title: "Restricted" });
  }
});

app.use(express.static(path.join(__dirname, 'gifs')));

// app.get("/", function (req, res, next) {
//   const { lstatSync, readdirSync } = require('fs')
//   const { join } = require('path')
//   const isDirectory = source => lstatSync(source).isDirectory()
//   const getDirectories = source =>
//     readdirSync(source).map(name => join(source, name)).filter(isDirectory)
//   var dirs = getDirectories('./dist/');
//   var targetDirs = dirs.map(x => x.split("/")[1]);

//   res.render("prototypeslist", { prototypeFolders: targetDirs });
// });



// 1st call for unredirected requests

app.use(staticFileMiddleware);

app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);

// 2nd call for redirected requests
app.use(staticFileMiddleware);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function encrypt(str) {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(str, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function decrypt(str) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(str, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

module.exports = app;
