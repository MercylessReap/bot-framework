var express = require('express');
var router = express.Router();
var log = require('../../models/log');
var mongoose = require('mongoose')
, dbhost = process.env.dbHost || "localhost"
, dbport = process.env.dbPort || "27017"
, dbuser = process.env.dbUser+":"
, dbpass = process.env.dbPass+"@";

  if(dbuser == "undefined:"){dbuser=""};
  if(dbpass == "undefined@"){dbpass=""};

var url = 'mongodb://'+dbuser+dbpass+dbhost+':'+dbport+'/ddbot';

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
    newlog.userID = req.body.userID;
    newlog.typeID = req.body.typeID;
    newlog.type = req.body.type;
    newlog.info = req.body.info;
    newlog.created = new Date;
    newlog.save((err, insertedlog) => {
        if(err){
            res.send("Error saving log");
        }else{
            res.json(insertedlog);
        }
    });
})
router.put('/:id', (req, res, next) => {
    console.log('Update a setting');
    setting.findByIdAndUpdate(req.params.id,
    {
        $set: {userID: req.body.userID, type: req.body.type, info: req.body.info}
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