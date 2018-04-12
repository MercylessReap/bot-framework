var express = require('express');
var router = express.Router();
var setting = require('../../models/setting');
var mongoose = require('mongoose');
var url = require('../../config/dbconfig');

mongoose.connect(url, { useMongoClient: true},(err) =>{
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/', (req, res, next) => {
    console.log('Get request for all settings');
    setting.find({})
    .exec((err, settings) => {
        if(err){
            res.send("Error retrieving settings");
        }else{
            res.json(settings);
        }
    })
})

router.get('/:id', (req, res, next) => {
    console.log('Get request for a single setting');
    setting.findById(req.params.id)
    .exec((err, settings) => {
        if(err){
            res.send("Error retrieving settings");
        }else{
            res.json(settings);
        }
    })
})

router.post('/', (req, res, next) => {
    console.log('Post a setting');
    var newsetting = new setting();
    newsetting.title = req.body.title;
    newsetting.url = req.body.url;
    newsetting.description = req.body.description;
    newsetting.save((err, insertedsetting) => {
        if(err){
            res.send("Error saving setting");
        }else{
            res.json(insertedsetting);
        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log('Update a setting');
    setting.findByIdAndUpdate(req.params.id,
    {
        $set: { 
            subscriptionKey: req.body.subKey, 
            luisRegion: req.body.luisRegion, 
            bingApiKey: req.body.bingKey,
            bingSpellCheckEnabled: bingStatus,
            updated: new Date
        }
    },
    {
        new: true
    },
    (err, updatedsetting) => {
        if(err){
            res.send("Error updating setting");
        }else{
            res.json(updatedsetting);
        }
    }
    )
})

router.delete('/:id', (req, res, next) => {
    console.log('Deleting a setting');
    setting.findByIdAndRemove(req.params.id, (err, deletedsetting) =>{
        if(err){
            res.send("Error deleting setting");
        }else{
            res.json(deletedsetting);
        }
    })
})

module.exports = router;