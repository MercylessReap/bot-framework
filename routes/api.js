var express = require('express')
  , router = express.Router()
  , department = require('./api/departments')
  , intent = require('./api/intents')
  , log = require('./api/logs')
  , setting = require('./api/settings')
  , team = require('./api/teams')
  , user = require('./api/users');
  
  router.use('/department', department);
  router.use('/intent', intent);
  router.use('/log', log);
  router.use('/setting', setting);
  router.use('/team', team);
  router.use('/user', user);
  module.exports = router;