var express = require('express')
var router = express.Router()

router.get('/',(req, res) =>{res.render('pages/dashboard/index',{title: "Dashboard | Dimension Data Bot Portal"})});

router.get('/alerts',(req, res) =>{res.render('pages/dashboard/alerts',{title: "Dashboard - Alerts | Dimension Data Bot Portal"})});

module.exports = router