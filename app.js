var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('./function/request-async');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tgr2018test', { useMongoClient: true })
//mongoose.connect('mongodb://test:1q2w3e4r@localhost:27017/tgr2018test', { useMongoClient: true })
  .then(() => {
    console.log('connection succesful')
  })
  .catch((err) => console.error(err));

var urls = require('./config/urls');

var sensors = [require('./models/Temperature'), require('./models/Accelerometer'), require('./models/Din1')]

var index = require('./routes/index');
var users = require('./routes/users');
var employees = require('./routes/employees');
var temperature = require('./routes/temperature');
var pressure = require('./routes/pressure');
var magnetometer = require('./routes/magnetometer');
var humidity = require('./routes/humidity');
var gyroscope = require('./routes/gyroscope');
var accelerometer = require('./routes/accelerometer');
var din1 = require('./routes/din1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/employees', employees);
app.use('/temperature', temperature);
app.use('/pressure', pressure);
app.use('/magnetometer', magnetometer);
app.use('/humidity', humidity);
app.use('/gyroscope', gyroscope);
app.use('/accelerometer', accelerometer);
app.use('/din1', din1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
