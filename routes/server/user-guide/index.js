var express = require('express')
var router = express.Router()

router.get('/', (req, res) =>{res.render('pages/guide/index');});

router.get('/user-guide/', (req, res) =>{res.render('pages/guide/guides');});

module.exports = router