var express = require('express')
    , router = express.Router()
    , home = require('./server/dashboard')
    , users = require('./server/users')
    , botGrowth = require('./server/bot')
    , guide = require('./server/guide')
    , logout = require('./server/logout');
// index page
router.get('/', (req, res) =>{
  res.render('index')
});
// Redirect the login route
router.get('/login', (req, res) =>{res.redirect('/dashboard/')});
// Config page 
router.get('/config', (req, res) =>{res.render('pages/config');});
// Home page 
router.use('/dashboard', home);
// User Management page 
router.use('/users', users);
// Bot Training page 
router.use('/bot-growth', botGrowth);
// Bot Guide page
router.use('/guide/', guide);
// Logout Route
router.use('/logout',logout);


module.exports = router;