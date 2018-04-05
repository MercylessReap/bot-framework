var express = require('express')
var router = express.Router()

router.get('/', (req, res) =>{res.render('pages/login');});
//Handle login request
router.post('/login/auth', (req,res) =>{
    console.log(req.body)
    loggedin = true
    res.redirect('/dashboard')
});

module.exports = router