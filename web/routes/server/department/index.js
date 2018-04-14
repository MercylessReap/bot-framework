const express = require('express'),
      router = express.Router(),
      api = require(rootDir+'/lib/api');

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
    console.log('Publish sent')
    api.publishLuisApp(req.body)
    .then((response)=>{
        console.log('app published on luis')
        return api.publishDepartment(req.body)
    }).then((response)=>{
        console.log('app successfully published')
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