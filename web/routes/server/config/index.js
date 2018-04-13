const express = require('express'),
      router = express.Router(),
      api = require('../../../../lib/apii')

router.get('/',(req, res) =>{
  let setting, log, departments;
  api.getSettings()
  .then((settingResponse) => {
     setting = settingResponse.data[0];return api.getLogs()})
  .then((logResponse)=>{
    log = logResponse.data;return api.getDepartments()})
  .then((departmentResponse)=>{
    departments = departmentResponse.data;
    res.render('pages/config/index',{
      title: "Site Configuration - Dimension Data Bot Portal",
      confid: setting._id,
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
  .catch((error)=>console.log(error))

});

router.post('/',(req, res) =>{
  if(req.body.bingStatus === 'Enabled'){
    bingStatus = true
  }else{
    bingStatus = false
  }
  api.putSetting(req.body,bingStatus).then((response)=>{
    console.log(response)
    res.json(response)
  }).catch((error)=>{
    console.log(error)
    res.json(error)
  })
 
});

module.exports = router