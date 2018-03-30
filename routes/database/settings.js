var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var setting = require('../../models/setting');

var url = "mongodb://localhost:27017/ddbot";
mongoose.connect(url, { useMongoClient: true},(err) =>{
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/settings', (req, res, next) => {
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

router.get('/settings/:id', (req, res, next) => {
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

router.post('/setting', (req, res, next) => {
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

router.put('/setting/:id', (req, res, next) => {
    console.log('Update a setting');
    setting.findByIdAndUpdate(req.params.id,
    {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
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

router.delete('/setting/:id', (req, res, next) => {
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