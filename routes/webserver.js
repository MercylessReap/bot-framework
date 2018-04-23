var express = require('express')
    , router = express.Router()
    , webserver = require('./server/index');
// index page
router.use('/', webserver);

module.exports = router;