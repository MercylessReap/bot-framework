var express = require('express')
var router = express.Router()

router.get('/manage',(req, res) =>{res.render('pages/users/manage')});

router.get('/activity',(req, res) =>{res.render('pages/users/activity')});

module.exports = router