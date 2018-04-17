var express = require('express')
  , router = express.Router()
  , department = require('./database/departments')
  , intent = require('./database/intents')
  , log = require('./database/logs')
  , setting = require('./database/settings')
  , team = require('./database/teams')
  , user = require('./database/users')
  , bot = require(rootDir+'/bot/app');
  
  router.use('/department', department);
  router.use('/intent', intent);
  router.use('/log', log);
  router.use('/setting', setting);
  router.use('/team', team);
  router.use('/user', user);
  router.use('/v1/', bot);
  module.exports = router;