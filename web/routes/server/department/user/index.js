var express = require('express')
var router = express.Router()

router.get('/team/',(req, res) =>{res.render('pages/department/users/manage')});

router.get('/activity-logs/',(req, res) =>{res.render('pages/department/users/activity')});

module.exports = router