var express = require('express');
var router = express.Router();
var department = require('../../models/department');
var mongoose = require('mongoose')
  , url = require('../../config/dbconfig')

mongoose.connect(url, { useMongoClient: true},(err) =>{
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/', (req, res, next) =>{
    console.log('Get request for all departments');
    department.find({})
    .exec((err, departments) => {
        if(err){
            res.send("Error retrieving departments");
        }else{
            res.json(departments);
        }
    })
})

router.get('/:id', (req, res, next) =>{
    console.log('Get request for a single department');
    department.findById(req.params.id)
    .exec((err, departments) =>{
        if(err){
            res.send("Error retrieving departments");
        }else{
            res.json(departments);
        }
    })
})

router.post('/', (req, res, next) =>{
    console.log('Post a department');
    var newdepartment = new department();
    newdepartment.name = req.body.name;
    newdeapartment.accessToken = req.body.accessToken;
    newdepartment.appID = req.body.appID;
    newdepartment.appPass = req.body.appPass;
    newdepartment.analyticsID = req.body.analyticsID;
    newdepartment.confluence = req.body.confluence;
    newdepartment.botName = req.body.botName;
    newdepartment.created = new Date;
    newdepartment.updated = new Date;
    newdepartment.save((err, inserteddepartment) =>{
        if(err){
            consloe.log(res.send("Error saving department"));
        }else{
            console.log(res.json(inserteddepartment));
        }
    });
})

router.put('/:id', (req, res, next) =>{
    console.log('Update a department');
    department.findByIdAndUpdate(req.params.id,
    {
        $set: {name: req.body.name, accessToken: req.body.accessToken,appID: req.body.appID, appPass: req.body.appPass, analyticsID: req.body.analyticsID, confluence: req.body.confluence, botName: req.body.botName, updated: new Date}
    },
    {
        new: true
    },
    (err, updateddepartment) =>{
        if(err){
            res.send("Error updating department");
        }else{
            res.json(updateddepartment);
        }
    }
    )
})

router.delete('/:id', (req, res, next) =>{
    console.log('Deleting a department');
    department.findByIdAndRemove(req.params.id, (err, deleteddepartment) =>{
        if(err){
            res.send("Error deleting department");
        }else{
            res.json(deleteddepartment);
        }
    })
})

module.exports = router;