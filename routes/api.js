const express = require('express')
    , router = express.Router()
    , department = require('./database/departments')
    , intent = require('./database/intents')
    , utterance = require('./database/utterances')
    , log = require('./database/logs')
    , setting = require('./database/settings')
    , permission = require('./database/permissions')
    , user = require('./database/users')
  
  router.use('/department', department);
  router.use('/intent', intent);
  router.use('/utterance', utterance);
  router.use('/log', log);
  router.use('/setting', setting);
  router.use('/permission', permission);
  router.use('/user', user);
  module.exports = router;