var express = require('express')
var router = express.Router()



router.get('/',(req, res) =>{
    var setting, log, departments
axios.get('http://localhost/api/setting/5ac7138f3c58a936c8e80be4')
  .then((response) => {
    setting = response.data
    return axios.get('http://localhost/api/log/');
  })
  .then((response)=>{
    log = response.data
    return axios.get('http://localhost/api/department/');
  }).then((response)=>{
    departments = response.data
      res.render('pages/config/index',{
        title: "Site Configuration - Dimension Data Bot Portal",
        confid:'5ac7138f3c58a936c8e80be4',
        skPlaceholder: setting.subscriptionKey,
        skValue: setting.subscriptionKey,
        bkPlaceholder: setting.bingApiKey,
        bkValue: setting.bingApiKey,
        bingStatus: setting.bingSpellCheckEnabled,
        luisRegion: setting.luisRegion,
        departmentsData: departments,
        logsData: log
      }) 
  })
    
});

router.post('/',(req, res) =>{
  if(req.body.bingStatus === 'Enabled'){
    bingStatus = true
  }else{
    bingStatus = false
  }
  axios.put('/api/setting/'+req.body.id,{
    subKey: req.body.subKey,
    luisRegion: req.body.luisRegion,
    bingKey: req.body.bingKey,
    bingStatus: bingStatus
  }).then((response)=>{
    console.log(response)
  }).catch((error)=>{
    console.log(error)
  })
 
});
module.exports = router