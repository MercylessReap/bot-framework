// Set up ============================
var express = require('express')
  , router = express.Router()
  , config = require('../../../../bot/config');
    axios = require('axios');


router.get('/',(req, res) =>{

  var app = {id:'nhmZQPH28475-)]-ecscGTK',pass:'b3bba897-1433-487e-963d-8d24bf28a287'}
  var LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/89b3e679-1506-4e5d-85bf-8afd5c81b702?subscription-key=fc069d5a824d4f98b3e995df1ddbcde9&staging=true&verbose=true&timezoneOffset=0&q='

  config.loadDialog ('http://localhost',config.connector,LuisModelUrl)

  axios.get('http://localhost/api/intent/')
  .then((response) => {
    console.log(response.data);
    res.render('pages/bot/intents/index',{
      title: "Intents | Dimension Data Bot Portal",
      intentsData:response.data
    })
  })
  .catch((error) => {
    console.log(error);
  });  
    
});
router.get('/:e/',(req, res) =>{
  axios.get('http://localhost/api/intent/'+req.params.e)
  .then((response) => {
    console.log(response.data);
    res.render('pages/bot/intents/view',{  
      title: "Intents - "+response.data.name+" | Dimension Data Bot Portal",
      id:req.params.e,
      name:response.data.name,
      department:response.data.department,
      question: response.data.synonyms,
      answer:response.data.answer,
      status:response.data.disabled,
      created:response.data.created,
      updated:response.data.updated
    })
  })
  .catch((error) => {
    console.log(error);
  });  
  
});
//Post Requests
var token = 'fc069d5a824d4f98b3e995df1ddbcde9'
var deptID='5abea0315abfbb0b50afdc0e'
router.post('/',(req, res) =>{
  var tname=req.body.name.replace(/\s/g, '');
  axios.get('http://localhost/api/department/'+deptID)
  .then((response) =>{
    console.log(response.data)
    var app={id:response.data.luisAppID,ver:response.data.luisAppVer}
    return app
  }).then((app)=>{
   return axios.post('https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/'+app.id+'/versions/'+app.ver+'/intents',{
        name: tname}, {headers: { 
            'Ocp-Apim-Subscription-Key': token,
            'Content-Type': 'application/json'
            }})
  }).then((response)=>{
   return axios.post('http://localhost/api/intent/',{ 
      name:tname,
      friendlyName:req.body.name,
      department:req.body.department,
      question: req.body.synonyms,
      answer:req.body.answer,
      status:req.body.disabled,
      luisID:response.data,
      updated:req.body.updated})
  }).then((response)=>{
    console.log('success ');
    //res.redirect('/bot-growth/intents/'+response.data._id)
    res.send(response.data._id)
  })
  .catch((error) => {
    console.log(error);
    res.send(error)
  });

  
})

module.exports = router