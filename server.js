const express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path')
      global.rootDir = path.resolve(__dirname);
      //test for locking down app
      global.user = {id:'5ab908dee7084e3638e36198', name:'Swaye Chateau',department:'5abea0315abfbb0b50afdc0e',perm:{admin:false, wizard:true}}
    , index = require('./routes/webserver')
    , api = require('./routes/api')
    , bot = require('./routes/bot')
    , port = process.env.PORT || 80
    , app = express();

    
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', index);
app.use('/api', api);
app.use('/bot', bot);

// define the 404 page route (leave last)
app.get('*', (req, res)=>{res.status(404).render('pages/error');});

app.listen(port, () =>{console.log("Server running on port:" + port);})
