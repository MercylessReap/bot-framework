var express = require('express')
    , router = express.Router()
    , config = require('./config/index')
    , department = require('./department/index')
    , home = require('./dashboard/index')
    , guide = require('./user-guide/index');

if(isBlank(user)){
    // Index page
    router.get('/', (req, res) => res.render('pages/guide/index',{title: "Dimension Data Bot Portal"}));
}else{
    // Index page
    router.use('/', home);
    //App Config
    router.use('/config/', config);
    // Config page 
    router.get('/config/', config);
    // Department Management page 
    router.use('/department/', department);
    // Home page 
    router.use('/dashboard/', home);
    // Bot Framework User Guide page
    router.use('/guide/', guide);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

module.exports = router;