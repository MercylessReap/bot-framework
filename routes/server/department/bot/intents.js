// Set up ============================
const express = require('express')
  , router = express.Router()
  , bot = require(rootDir+'/lib/bot')
  , api = require(rootDir+'/lib/api')


router.get('/',(req, res) =>{
  console.log('Refreshing department bots intent list and loading all intents');
  let departments
  api.getDepartments()
  .then((response)=>{
    departments= response.data
    return api.getIntents()
  })
  .then((response) => {
    res.render('pages/department/bot/intents/index',{
      title: "Intents | Dimension Data Bot Portal",
      intentsData:response.data,
      departments:departments
    })
  })
  .catch((error) => {
    console.log(error);
  });  
    
});

//Post Requests
router.post('/',(req, res) =>{

  api.getDepartment(req.body.department)
  .then((response) =>{
    console.log('sending new intent to luis')
    console.log(response.data)
    return api.postLuisIntent(response.data, req.body.name.replace(/\s/g, ''))
  }).then((response)=>{
    console.log('succesfully sent intent to luis')
    console.log(response)
    return api.postIntent(req.body, response.data)
  }).then((response)=>{
    console.log('success ');
    res.redirect(`/department/intents/${response.data._id}`)
    //res.send(response.data._id)
  })
  .catch((error) => {
    console.log(error);
    res.send(error)
  });

})

router.get('/:e/',(req, res) =>{
  let departments
  api.getDepartments()
  .then((response)=>{
    departments=response.data
    return api.getIntent(req.params.e)
  }).then((response)=>{
    console.log(response.data);
    res.render('pages/department/bot/intents/view',{  
      title: `Intents - ${response.data.name} | Dimension Data Bot Portal`,
      intent:response.data,
      departments:departments,

    })
  }).catch((error) => console.log(error));  
  
});
router.get('/:id/delete/',(req,res)=>{
  let intent
  api.getIntent(req.params.id)
  .then((response)=>{
    intent = response.data
    return api.getDepartment(intent.department)
  })
  .then((response)=>{
    return api.deleteLuisIntent(response.data, intent.luisID)
  })
  .then((response)=>{
    return api.deleteIntent(intent._id)
  })
  .then((response)=>{
    res.send(response.data)
  })
  .catch((error)=>console.log(error))
})

router.post('/:id/',(req, res) =>{
  console.log('update intent sent')
  let oldIntent,oldDepartment;
  api.getIntent(req.params.id)
  .then((response)=>{
    oldIntent = response.data
    return api.getDepartment(oldIntent.department)
  }).then((response)=>{
    oldDepartment = response.data
    if(req.body.department !== oldDepartment._id){
      console.log(oldDepartment)
      return api.deleteLuisIntent(oldDepartment,oldIntent.luisId)
      .then((response)=>{
        return api.deleteIntent(oldIntent._id)
      })
      .then((response)=>{
        return api.getDepartment(req.body.department)
      })
      .then((response)=>{
        return api.postLuisIntent(response.data,req.body.name)
      })
      .then((response)=>{
        return api.postIntent(req.body, response.data)
      })
    }else if(req.body.name !==oldIntent.name){
      console.log('updating intent on luis')
      return api.putLuisIntent(oldDepartment,oldIntent.luisId,req.body.name)
      .then((response)=>{
        return api.putIntent(req.body)
      })
    }else{
      return api.putIntent(req.body)
    }
  })
  .then((response)=>{
    res.send('Intent '+req.body.name+' updated')
  }).catch((error)=>res.send(error.response.data))
  
});

module.exports = router