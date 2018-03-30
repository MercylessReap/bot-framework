var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/api');

var port = process.env.PORT || 8080;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', (req, res) =>{ res.send('Hi World!!')});
app.use('/api', api);


app.use('*', (req, res) =>{
    res.redirect('/');
});

app.listen(port, () =>{console.log("Server running on port:" + port);})
