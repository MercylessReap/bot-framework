const express = require('express'),
    router = express.Router()
    botController = require(rootDir+'/lib/bot');

//listen for messages
router.post('/dynamic', function(req,res) {
    botController.start(router);
    res.status(200).send('reload routes');
});

router.post('/all-dialogs', function(req,res) {
    botController.loadDialogs()
    res.status(200).send('reload All Bot Dialogs');
});

router.post('/:id/dialogs', function(req,res) {
    //5ad12a0983863e3d605cc0a0
    botController.loadDialog(req.params.id)
    res.status(200).send('reloading %s Bot Dialogs',req.params.id);
});

module.exports = router


