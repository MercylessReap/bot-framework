var express = require('express')
    , router = express.Router()
    , config = require('./config/index')
    , department = require('./department/index')
    , home = require('./dashboard/index')
    , guide = require('./user-guide/index')
    , auth = require('./auth/index');
// Index page
router.get('/', (req, res) => res.render('pages/guide/index',{title: "Dimension Data Bot Portal"}));
//App Config
router.use('/config/', config);
// Redirect the login route
router.get('/auth/', auth);
// Config page 
router.get('/config/', config);
// Department Management page 
router.use('/department/', department);
// Home page 
router.use('/dashboard/', home);
// Bot Framework User Guide page
router.use('/guide/', guide);

module.exports = router;