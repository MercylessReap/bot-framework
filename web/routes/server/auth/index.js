var express = require('express')
    , router = express.Router()
    , login = require('./login')
    , logout = require('./logout');
// Auth page
router.get('/', (req, res) =>{ res.render('index')});
// Login Route
router.get('/login', login);
// Logout Route 
router.get('/logout', logout);


module.exports = router;