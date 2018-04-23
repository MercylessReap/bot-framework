const express = require('express')
    , router = express.Router()
    , utterance = require(rootDir+'/models/utterance')
    , mongoose = require('mongoose')
    , url = require(rootDir+'/lib/config');

mongoose.connect(url, { useMongoClient: true},(err) =>{
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/', (req, res, next) =>{
    console.log('Get request for all utterances');
    utterance.find({})
    .exec((err, utterances) =>{
        if(err){
            res.send("Error retrieving utterances");
        }else{
            res.json(utterances);
        }
    })
})

router.get('/:id', (req, res, next) => {
    console.log('Get request for a single utterance');
    utterance.findbyId(req.params.id)
    .exec((err, utterances) => {
        if(err){
            res.send("Error retrieving utterances");
        }else{
            res.json(utterances);
        }
    })
})

router.post('/', (req, res, next) => {
    console.log('Post a utterance');
    var newutterance = new utterance();
    newutterance.intentId = req.body.intentId;
    newutterance.luisId = req.body.luisId;
    newutterance.text = req.body.text;
    newutterance.created = new Date;
    newutterance.save((err, insertedutterance) => {
        if(err){
            res.send("Error saving utterance");
        }else{
            res.json(insertedutterance);
        }
    });
})
router.put('/:id', (req, res, next) => {
    console.log('Update a utterance');
    utterance.findByIdAndUpdate(req.params.id,
    {
        $set: {
            intentId: req.body.intentId,
            luisId: req.body.luisId,
            text: req.body.text,
            updated: new Date
        }
    },
    {
        new: true
    },
    (err, updatedutterance) => {
        if(err){
            res.send("Error updating utterance");
        }else{
            res.json(updatedutterance);
        }
    }
    )
})
router.delete('/:id', (req, res, next) =>{
    console.log('Deleting a utterance');
    utterance.findByIdAndRemove(req.params.id, (err, deletedutterance) =>{
        if(err){
            res.send("Error deleting utterance");
        }else{
            res.json(deletedutterance);
        }
    })
})

module.exports = router;