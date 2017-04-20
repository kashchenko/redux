var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static('views'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', function(res, req){
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(3000, function(){
    console.log('Server started at port 3000');
});