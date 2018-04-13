const express = require('express'),
      router = express.Router(),
      api = require('../../../../lib/apii');

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
router.post('/submit/',(req,res)=>{
    console.log('subimt sent')
    let name = req.body.name.replace(/\s/g, '');
    api.postLuisApp(name)
    .then((luis)=>{
        console.log('luis response is good')
        console.log(luis.data)
        return  api.postDepartment(req.body, luis.data) })
    .then((department)=>res.redirect(`/department/${department.data._id}`))
    .catch((error)=>console.log(error))
})
router.post('/:id',(req,res)=>{
    api.getDepartment(req.params.id)
      .then((response)=>{
        if (req.body.name = response.data.name){
            return api.putDepartment(req.body)
        }else{
            api.putLuisApp(req.body.name)
            .then((response)=>{
                return api.putDepartment(req.body)
            })
        }
      }).then((response)=>{
          res.json(response)
      }).catch((error)=> console.log(error))
})
module.exports = router