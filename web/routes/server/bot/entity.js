// Set up ============================
var express = require('express')
  , router = express.Router()
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
    axios = require('axios');


router.get('/intents/',(req, res) =>{
    
    res.render('pages/bot/intents')
    
});
router.get('/intent/:e/',(req, res) =>{
  
    axios.get('../../api/intent/'+req.params.e)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    
  res.render('pages/bot/intents/view',{
      id:req.params.e,
      name:'hi',
      department:'global',
      question: 'Hi There',
      answer:'hello',
      status:'true',
      created:'yesterday',
      updated:'today'
    })
  
});

router.get('/train/',(req, res) =>{res.render('pages/bot/train')});

router.get('/test/',(req, res) =>{res.render('pages/bot/test')});

module.exports = router