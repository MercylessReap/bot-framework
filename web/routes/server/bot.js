// Set up ============================
var express = require('express')
  , router = express.Router()
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , timestamp = new Date(Date.now()).toLocaleString()
  , dbhost = process.env.mongodbHost || "localhost"
  , dbport = process.env.mongodbPort || "27017"
  , dbuser = process.env.mongodbUser+":"
  , dbpass = process.env.mongodbPass+"@";

    if(dbuser == "undefined:"){
        dbuser =""}
    if(dbpass == "undefined@"){
        dbpass=""};

var url = 'mongodb://'+dbuser+dbpass+dbhost+':'+dbport;

var db, intents, logs ;


router.get('/intents/',(req, res) =>{
    
    res.render('pages/bot/intents')
    
});
router.get('/intent/:e/',(req, res) =>{
    
  res.render('pages/bot/intents/view',{id:req.params.e})
  
});

router.get('/train/',(req, res) =>{res.render('pages/bot/train')});

router.get('/test/',(req, res) =>{res.render('pages/bot/test')});

module.exports = router