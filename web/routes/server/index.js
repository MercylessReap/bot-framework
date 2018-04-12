var express = require('express')
    , router = express.Router()
    , config = require('./config/index')
    , department = require('./department/index')
    , home = require('./dashboard/index')
    , users = require('./user/index')
    , botGrowth = require('./bot/index')
    , guide = require('./help-guide/index')
    , auth = require('./auth/index');
// Index page
router.get('/', (req, res) => res.render('index',{title: "Dimension Data Bot Portal"}));
//App Config
router.use('/config/', config);
// Redirect the login route
router.get('/auth/', auth);
// Config page 
router.get('/config/', config);
// Department page 
router.use('/department/', department);
// Home page 
router.use('/dashboard/', home);
// User Management page 
router.use('/users/', users);
// Bot Training page 
router.use('/bot-growth', botGrowth);
// Bot Guide page
router.use('/guide/', guide);

module.exports = router;