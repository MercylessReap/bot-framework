// Set up ============================
var express = require('express')
  , router = express.Router()
  , intent = require('./intent')
  , entity = require('./entity')
  , test = require('./test')
  , train = require('./train')



router.use('/intents/',intent);

router.use('/entities/',entity);

router.use('/train/',train);

router.use('/test/',test);

module.exports = router