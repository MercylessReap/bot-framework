const express = require('express')
    , router = express.Router()
    , api = require(rootDir+'/lib/api')
    , intent = require('./bot/intents')
    , entities = require('./bot/entities')
    , train = require('./bot/train')
    , test = require('./bot/test');
    
//Department bot intents, entities and training    
router.use('/intents/',intent);
router.use('/entities/',entities);
router.use('/train/',train);
router.use('/test/',test);

//Department Users, Team and logs
router.get('/team/',(req, res) =>{res.render('pages/department/users/manage')});
router.get('/activity-logs/',(req, res) =>{res.render('pages/department/users/activity')});

//Main Department Routes
//everyone department member can see
router.get('/',(req,res)=>{
    api.getDepartment(user.department)
    .then((response)=>{
        res.render('./pages/department/view',{
          title:response.data.friendlyName+' - Dimension Data Bot Portal',
          data:response.data,user:user,perm:perm
        })
    })
  .catch((error)=>console.log(error))
})
    
router.post('/submit/',(req,res)=>{
    console.log('subimt sent')
    let name = req.body.name
    api.postLuisApp(name)
    .then((luis)=>{
        console.log('luis response is good')
        console.log(luis.data)
        return api.postDepartment(req.body, luis.data) })
    .then((department)=>res.redirect(`/department/${department.data._id}`))
    .catch((error)=>res.send(error.response.data))
})

router.post('/publish/',(req,res)=>{
    console.log('Publish sent')
    api.publishLuisApp(req.body)
    .then((response)=>{
        console.log('app published on luis')
        return api.publishDepartment(req.body)
    }).then((response)=>{
        res.redirect(req.get('referer'))
        console.log('app successfully published')
    }).catch((error)=>res.send(error.response.data))

})

router.get('/:id',(req,res)=>{
    let config, intents;
    api.getSettings()
      .then((setting) => {config = setting.data[0];return api.getIntents()})
      .then((intent)=>{ intents=intent.data; return api.getDepartment(req.params.id)})
      .then((response)=>{
          res.render('./pages/department/index',{
            title:response.data.friendlyName+' - Dimension Data Bot Portal',
            data:response.data,config:config,
            dataIntents:intents
          })
      })
    .catch((error)=>res.send(error.response.data))
})

router.post('/:id',(req,res)=>{
    api.getDepartment(req.params.id)
      .then((response)=>{
        console.log('update department request sent')
       if (req.body.friendlyName !== response.data.friendlyName){
            console.log('updating on luis')
            let name = req.body.friendlyName
            return api.putLuisApp(name, req.body.luisAppId)
            .then((response)=>{
                return api.putDepartment(req.body)
            })
        }else{
            console.log('updating a department')
            return api.putDepartment(req.body)
        }
      }).then((reponse)=>{
        console.log('department successfully updated')
        res.redirect(req.get('referer'))
      }).catch((error)=> console.log(error))
})
router.get('/:id/intents',(req,res)=>{
    console.log('get them intents')
    api.getDepartment(req.params.id)
      .then((app) => {return api.getLuisAppIntents(app.data)})
      .then((response)=> res.send(response.data))
    .catch((error)=>res.send(error.response.data))
})

router.get('/:id/appStatus',(req,res)=>{
    console.log('Check Train Status department')
    api.getDepartment(req.params.id)
    .then((response)=>{
        console.log('Check Train Status on luis')
        return api.luisTrainStatus(response.data)
    })
    .then((response)=>{
        console.log('app train status is valid')
        res.send(response.data)
    }).catch((error)=>res.send(error.response.data))

})
router.get('/:id/train/',(req,res)=>{
    console.log('Train Request Sent')
    api.getDepartment(req.params.id)
    .then((response)=>{
        console.log('app trained on luis')
        return api.trainLuisApp(response.data)
    })
    .then((response)=>{
        console.log('app train request is valid')
        res.send(response.data)
    }).catch((error)=>res.send(error.response.data))
})

router.get('/:id/delete/',(req,res)=>{
    api.getDepartment(req.params.id)
    .then((response)=>{
        return api.deleteLuisApp(response.data.luisAppId)
    })
    .then((response)=>{
        return api.deleteDepartment(req.params.id)
    })
    .then((response)=>res.send(`The ${response.data.friendlyName} Bot and setting have been successfully Deleted!!!`))
    .catch((error)=>res.send(error.response.data))
})
module.exports = router