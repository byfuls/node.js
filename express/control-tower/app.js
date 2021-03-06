var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var cors = require('cors');

///////////////////////////////////////////////////////////////////////////////////////////////
// regist routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var control_main = require('./routes/control_main');

///////////////////////////////////////////////////////////////////////////////////////////////
// view engine setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/control_main', control_main);

///////////////////////////////////////////////////////////////////////////////////////////////
// byfuls add - tcp server
//const net = require('net');
//const svr = net.createServer((client)=>{
//  console.log(`client connect: `);
//  console.log(` -local: addr: ${client.localAddress}:${client.localPort}`);
//  console.log(` -remote: addr: ${client.remoteAddress}:${client.remotePort}`);
//  
//}).listen(3001, ()=>{
//  console.log(`server listening: ${JSON.stringify(svr.address())}`);
//  svr.on('close', ()=>{
//    console.log(`server terminated`);
//  }).on('error', (err)=>{
//    console.log(`server error: ${JSON.stringify(err)}`);
//  });
//});

///////////////////////////////////////////////////////////////////////////////////////////////
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
