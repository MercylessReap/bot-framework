var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var team = require('../../models/team');

var url = "mongodb://localhost:27017/ddbot";
mongoose.connect(url, { useMongoClient: true},(err) =>{
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/teams', (req, res, next) =>{
    console.log('Get request for all teams');
    team.find({})
    .exec((err, teams) =>{
        if(err){
            res.send("Error retrieving teams");
        }else{
            res.json(teams);
        }
    })
})

router.get('/teams/:id', (req, res, next) => {
    console.log('Get request for a single team');
    team.findById(req.params.id)
    .exec((err, teams) => {
        if(err){
            res.send("Error retrieving teams");
        }else{
            res.json(teams);
        }
    })
})

router.post('/team', (req, res, next) => {
    console.log('Post a team');
    var newteam = new team();
    newteam.title = req.body.title;
    newteam.url = req.body.url;
    newteam.description = req.body.description;
    newteam.save((err, insertedteam) => {
        if(err){
            res.send("Error saving team");
        }else{
            res.json(insertedteam);
        }
    });
})

router.put('/team/:id', (req, res, next) => {
    console.log('Update a team');
    team.findByIdAndUpdate(req.params.id,
    {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new: true
    },
    (err, updatedteam) => {
        if(err){
            res.send("Error updating team");
        }else{
            res.json(updatedteam);
        }
    }
    )
})

router.delete('/team/:id', (req, res, next) => {
    console.log('Deleting a team');
    team.findByIdAndRemove(req.params.id, (err, deletedteam) => {
        if(err){
            res.send("Error deleting team");
        }else{
            res.json(deletedteam);
        }
    })
})

module.exports = router;