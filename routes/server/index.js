var express = require('express')
    , router = express.Router()
    , api = require(rootDir+'/lib/api')
    , config = require('./config/index')
    , install = require('./config/install')
    , department = require('./department/index')
    , home = require('./dashboard/index')
    , guide = require('./user-guide/index');
    
    // Index page
    router.use('/', home);
    //App Config
    router.use('/install/', install);
    // Config page 
    router.use('/config/', config);
    // Department Management page 
    router.use('/department/', department);
    // Home page 
    router.use('/dashboard/', home);
    // Bot Framework User Guide page
    router.use('/guide/', guide);

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

module.exports = router;