const express = require('express')
    , router = express.Router()
    , api = require(rootDir+'/lib/api');

router.get('/',(req, res) =>{

    res.render('pages/config/install',{
      title: "Site First Setup Configuration - Dimension Data Bot Portal",
    })
  })
  
  router.post('/',(req, res) =>{
    console.log('Generating New Setting')
    api.postSetting(req.body).then((response)=>{
        return api.postLuisApp(req.body.name)
    }).then((response)=>{
        return api.postDepartment(req.body,response.data)
    }).then((response)=>{
        res.redirect('/')
    }).catch((error)=>{
        console.log(error)
        res.send(error)
    })
});

module.exports = router