/*  npm download list
    - express: backend webframework
    - morgan: logging middleware            npm repo morgan => goto github of morgan
    - body-parser: json parser
    - nodemon: for develop, not ctrl+c -> start
*/

var express = require('express');
var app = express();
var user = require('./routes/user');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var myLogger = function(req, res, next){
    console.log(req.url);
    next();
};
//app.use(myLogger);

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/', express.static('public'));     // app.get vs static = 먼저 작성하는게 우선권이 있음

//app.get('/', (req, res)=>{
//    res.send('[root] hello world');
//});

app.listen(3000, ()=>{
    console.log('[root] example app is listening on port 3000');
});