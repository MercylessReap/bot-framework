var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var intent = require('../../models/intent');

var url = "mongodb://localhost:27017/ddbot";
mongoose.connect(url, { useMongoClient: true},(err) => {
    if(err){
        console.error("Error! " + err);
    }
});

router.get('/', (req, res, next) => {
    console.log('Get request for all intents');
    intent.find({})
    .exec((err, intents) => {
        if(err){
            res.send("Error retrieving intents");
        }else{
            console.log(intents)
            res.json(intents);
        }
    })
})

router.get('/:id', (req, res, next) => {
    console.log('Get request for a single intent');
    intent.findById(req.params.id)
    .exec((err, intents) => {
        if(err){
            res.send("Error retrieving intents");
        }else{
            res.json(intents);
        }
    })
})

router.post('/', (req, res, next) =>{
    console.log('Post a intent');
    var newintent = new intent();
    newintent.name = req.body.name;
    newintent.question = req.body.question;
    newintent.answer = req.body.answer;
    newintent.department = req.body.department;
    newintent.disabled = 'false';
    newintent.trigger = req.body.trigger;
    newintent.created = new Date;
    newintent.updated = new Date;
    newintent.save((err, insertedintent) => {
        if(err){
            res.send("Error saving intent");
        }else{
            res.json(insertedintent);
        }
    });
})

router.put('/:id', (req, res, next) => {
    console.log('Update a intent');
    intent.findByIdAndUpdate(req.params.id,
    { 
        $set: {name: req.body.name, question: req.body.question, answer: req.body.answer, department: req.body.department, disabled: req.body.status, trigger: req.body.trigger, updated: new Date}
    },
    {
        new: true
    },
    (err, updatedintent) =>{
        if(err){
            res.send("Error updating intent");
        }else{
            res.json(updatedintent);
        }
    }
    )
})

router.delete('/:id', (req, res, next) =>{
    console.log('Deleting a intent');
    intent.findByIdAndRemove(req.params.id, (err, deletedintent) => {
        if(err){
            res.send("Error deleting intent");
        }else{
            res.json(deletedintent);
        }
    })
})

module.exports = router;