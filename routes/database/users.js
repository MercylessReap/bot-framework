const express = require('express')
    , router = express.Router()
    , user = require(rootDir+'/models/user')
    , mongoose = require('mongoose')
    , url = require(rootDir+'/lib/config');

mongoose.connect(url, { useMongoClient: true},(err) => {
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
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

router.post('/', (req, res, next) => {
    console.log('Post a user');
    var newuser = new user();
    newuser.disabled = req.body.disabled;
    newuser.email = req.body.email;
    newuser.name = req.body.name;
    newuser.token = req.body.token;
    newuser.type = req.body.type
    newuser.password = req.body.pass
    newuser.department = req.body.department;
    newuser.access = req.body.access;
    newuser.created = new Date;
    newuser.save((err, inserteduser) => {
        if(err){
            res.send("Error saving user");
        }else{
            res.json(inserteduser);
        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log('Update a user');
    user.findByIdAndUpdate(req.params.id,
    {
        $set: {
            disabled: req.body.disabled,
            email: req.body.email,
            name: req.body.name,
            token: req.body.token,
            type: req.body.type,
            password: req.body.pass,
            department: req.body.department,
            access: req.body.access,
            created: new Date,
        }
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

router.delete('/:id', (req, res, next) => {
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