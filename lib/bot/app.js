var express = require('express'),
    router = express.Router(),
    axios = require('axios');
var config = require('./config');
var app = {id:'nhmZQPH28475-)]-ecscGTK',pass:'b3bba897-1433-487e-963d-8d24bf28a287'}
var LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/89b3e679-1506-4e5d-85bf-8afd5c81b702?subscription-key=fc069d5a824d4f98b3e995df1ddbcde9&staging=true'

config.loadDialog ('http://localhost',config.connector,LuisModelUrl)
//listen for messages
router.post('/messages', config.connector.listen());

module.exports = router



