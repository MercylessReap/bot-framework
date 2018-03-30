var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var log = require('../../models/log');

var url = "mongodb://localhost:27017/ddbot";
mongoose.connect(url, { useMongoClient: true},(err) =>{
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/', (req, res, next) =>{
    console.log('Get request for all logs');
    log.find({})
    .exec((err, logs) =>{
        if(err){
            res.send("Error retrieving logs");
        }else{
            res.json(logs);
        }
    })
})

router.get('/:id', (req, res, next) => {
    console.log('Get request for a single log');
    log.findById(req.params.id)
    .exec((err, logs) => {
        if(err){
            res.send("Error retrieving logs");
        }else{
            res.json(logs);
        }
    })
})

router.post('/', (req, res, next) => {
    console.log('Post a log');
    var newlog = new log();
    newlog.event = req.body.event;
    newlog.type = req.body.type;
    newlog.typeID = req.body.typeID;
    newlog.info = req.body.info;
    newlog.created = new Date;
    newlog.updated = new Date;
    newlog.save((err, insertedlog) => {
        if(err){
            res.send("Error saving log");
        }else{
            res.json(insertedlog);
        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log('Update a log');
    log.findByIdAndUpdate(req.params.id,
    {
        $set: {event: req.body.event, type: req.body.type, typeID: req.body.typeID, info: req.body.info, updated: new Date}
    },
    {
        new: true
    },
    (err, updatedlog) =>{
        if(err){
            res.send("Error updating log");
        }else{
            res.json(updatedlog);
        }
    }
    )
})

router.delete('/:id', (req, res, next) =>{
    console.log('Deleting a log');
    log.findByIdAndRemove(req.params.id, (err, deletedlog) =>{
        if(err){
            res.send("Error deleting log");
        }else{
            res.json(deletedlog);
        }
    })
})

module.exports = router;