// Set up ============================
var express = require('express')
  , router = express.Router();
  
router.get('/',(req, res) =>{res.render('pages/bot/train')});

module.exports = router