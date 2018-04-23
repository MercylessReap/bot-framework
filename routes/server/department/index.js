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
        return  api.postDepartment(req.body, luis.data) })
    .then((department)=>res.redirect(`/department/${department.data._id}`))
    .catch((error)=>console.log(error))
})
router.post('/train/',(req,res)=>{
    console.log('Train Request Sent')
    api.trainLuisApp(req.body)
    .then((response)=>{
        console.log('app trained on luis')
        return api.trainDepartment(req.body)
    }).then((response)=>{
        console.log('app training date successfully logged to department')
    }).catch((error)=>console.log(error))

})
router.post('/publish/',(req,res)=>{
    console.log('Publish sent')
    api.publishLuisApp(req.body)
    .then((response)=>{
        console.log('app published on luis')
        return api.publishDepartment(req.body)
    }).then((response)=>{
        console.log('app successfully published')
    }).catch((error)=>console.log(error))

}) 
router.get('/:id',(req,res)=>{
    let config;
    api.getSettings()
      .then((setting) => {config = setting.data[0];return api.getDepartment(req.params.id)})
      .then((response)=>{
          res.render('./pages/department/index',{
            title:response.data.friendlyName+' - Dimension Data Bot Portal',
            data:response.data,config:config
          })
      })
    .catch((error)=>console.log(error))
})
router.get('/:id/delete/',(req,res)=>{
    api.getDepartment(req.params.id)
    .then((response)=>{
        return api.deleteLuisApp(response.data.luisAppID)
    })
    .then((response)=>{
        return api.deleteDepartment(req.params.id)
    })
    .then((response)=>res.send(`The ${response.data.friendlyName} Bot and setting have been successfully Deleted!!!`))
    .catch((error)=>console.log(error))
})
router.post('/:id',(req,res)=>{
    api.getDepartment(req.params.id)
      .then((response)=>{
        console.log('update department request sent')
       if (req.body.friendlyName !== response.data.friendlyName){
            console.log('updating on luis')
            let name = req.body.friendlyName
            return api.putLuisApp(name, req.body.luisAppID)
            .then((response)=>{
                return api.putDepartment(req.body)
            })
        }else{
            console.log('updating a department')
            return api.putDepartment(req.body)
        }
      }).then((reponse)=>{

      }).catch((error)=> console.log(error))
})

module.exports = router