const express = require('express'),
    router = express.Router()
    botController = require(rootDir+'/lib/bot');
// hook to initialize the dynamic route at runtime
botController.start(router)

router.post('/dynamic', function(req,res) {
    botController.init(router);
    res.status(200).send('reload routes');
});

module.exports = router


