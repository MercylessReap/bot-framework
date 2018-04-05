var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/api');

var port = process.env.PORT || 80;
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(express.static(__dirname + '/client'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', index);
app.use('/api', api);

// define the 404 page route (leave last)
app.get('*', (req, res)=>{res.status(404).render('pages/error');});

app.listen(port, () =>{console.log("Server running on port:" + port);})
