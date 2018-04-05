var express = require('express')
var router = express.Router()

router.get('/', (req, res) =>{res.render('pages/logout');});
router.post('/', (req,res) =>{
    console.log(req.body)
    loggedin = true
    res.redirect('/')
});

module.exports = router