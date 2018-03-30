var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../../models/user');

var url = "mongodb://localhost:27017/ddbot";
mongoose.connect(url, { useMongoClient: true},(err) => {
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/users', (req, res, next) => {
    console.log('Get request for all users');
    user.find({})
    .exec((err, users) => {
        if(err){
            res.send("Error retrieving users");
        }else{
            res.json(users);
        }
    })
})

router.get('/users/:id', (req, res, next) => {
    console.log('Get request for a single user');
    user.findById(req.params.id)
    .exec((err, users) => {
        if(err){
            res.send("Error retrieving users");
        }else{
            res.json(users);
        }
    })
})

router.post('/user', (req, res, next) => {
    console.log('Post a user');
    var newuser = new user();
    newuser.title = req.body.title;
    newuser.url = req.body.url;
    newuser.description = req.body.description;
    newuser.save((err, inserteduser) => {
        if(err){
            res.send("Error saving user");
        }else{
            res.json(inserteduser);
        }
    });
})

router.put('/user/:id', (req, res, next) => {
    console.log('Update a user');
    user.findByIdAndUpdate(req.params.id,
    {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new: true
    },
    (err, updateduser) => {
        if(err){
            res.send("Error updating user");
        }else{
            res.json(updateduser);
        }
    }
    )
})

router.delete('/user/:id', (req, res, next) => {
    console.log('Deleting a user');
    user.findByIdAndRemove(req.params.id, (err, deleteduser) => {
        if(err){
            res.send("Error deleting user");
        }else{
            res.json(deleteduser);
        }
    })
})

module.exports = router;