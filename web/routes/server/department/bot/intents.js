// Set up ============================
var express = require('express')
  , router = express.Router()
  , bot = require(rootDir+'/lib/bot')
  , api = require(rootDir+'/lib/api');


router.get('/',(req, res) =>{

  bot.start()
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
    return api.postLuisIntent(response.data, req.body.name.replace(/\s/g, ''))
  }).then((response)=>{
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
    res.render('pages/department/bot/view',{  
      title: `Intents - ${response.data.name} | Dimension Data Bot Portal`,
      intent:response.data,
      departments:departments
    })
  }).catch((error) => console.log(error));  
  
});

router.post('/:e/',(req, res) =>{
  let departments
  api.getDepartments()
  .then((response)=>{
    departments=response.data
    return api.getIntent(req.params.e)
  }).then((response)=>{
    console.log(response.data);
    res.render('pages/department/bot/view',{  
      title: `Intents - ${response.data.name} | Dimension Data Bot Portal`,
      intent:response.data,
      departments:departments
    })
  }).catch((error) => console.log(error));  
  
});

module.exports = router