var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/webserver/index');
var botHook = require('./routes/api/bot');
var database = require('./routes/api/database');

var port = process.env.PORT || 80;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/api', database);
app.use('/api/v1', botHook);

app.listen(port, function() {console.log('listening on '+port+'!')})