var express = require('express')
var router = express.Router()

router.get('/',(req, res) =>{res.render('pages/dashboard/index')});

router.get('/alerts',(req, res) =>{res.render('pages/dashboard/alerts')});

router.get('/config',(req, res) =>{res.render('pages/config')});
//router.get('/config',(req, res) =>{res.render('pages/config')});
module.exports = router