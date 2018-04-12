const express = require('express'),
    router = express.Router(),
    axios = require('axios');

router.get('/:id',(req,res)=>{
    getDepartment(req.params.id)
    .then((response)=>{
        getSettings().then((config)=>{
            res.render('./pages/department/index',{
                title:response.data.friendlyName+' - Dimension Data Bot Portal',
                data:response.data,config:config.data[0]
            })
        })
    }).catch((error)=>{
        console.log(error)
    })
})

router.post('/publish/',(req,res)=>{
    let bool
    if(req.body.luisState === 'Staging'){bool = true}else{bool = false}
    let array ={appid:req.body.luisAppID,appVer:req.body.luisAppVer,publishBool:bool,region:req.body.region,subKey:req.body.subkey}
    console.log('Publishing App')
    publishLuisApp(array) 
    .then((luis)=>{
        console.log('successfully published to luis')
        console.log(luis)
        updatePubDepartment(req.body).then((response)=>{
            res.redirect(`/department/${req.body.id}`)
        }).catch((error)=>console.log(error),res.send(error.data))  
    }).catch((error)=>{console.log(error),res.send(error.data)})
})

router.post('/submit/',(req,res)=>{
    console.log('subimt sent')
    let name = req.body.name.replace(/\s/g, '')
    getSettings()
      .then((setting)=>{
        let region =  setting.data[0].luisRegion
        let subkey =  setting.data[0].subscriptionKey
        console.log(region)
        console.log('sending to luis')
        postLuisApp(region,name,subkey).then((luis)=>{
            console.log('luis response is good')
            console.log(luis.data)
            postDepartment(req.body, luis.data) .then((department)=>{
                res.redirect(`/department/${department.data._id}`)
            }).catch((error)=>{
                console.log(error)
            })
        }).catch((error)=>console.log(error))
    }).catch((error)=>console.log(error))
    
})

router.get('/:id/delete/',(req,res)=>{
    console.log('Delete Request Sent')
    getDepartment(req.params.id).then((department)=>{
        var luisApp=department.data.luisAppID
        getSettings().then((setting)=>{
            console.log(setting.data[0].luisRegion)
            deleteLuisApp(setting.data[0].luisRegion,luisApp,setting.data[0].subscriptionKey).then((luis)=>{
                deleteDepartment(req.params.id).then((response)=>res.send(response.data))
            })
        })
    }).catch((error)=>console.log(error))
})
//Functions


function getSettings() {
    return axios.get('/api/setting/');
}
function publishLuisApp(array){
    return axios.post(`https://${array.region}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${array.appid}/publish`,{
        "versionId": array.appVer,
        "isStaging": array.publishBool,
        "region": array.region
    },{headers: { 
        'Ocp-Apim-Subscription-Key': array.subKey,
        'Content-Type': 'application/json'
    }})
}
function postLuisApp(luisRegion,name,subKey){

    return axios.post(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/`,
        {
            name: name,
            description: `This is the ${name} application`,
            culture: "en-us",
            usageScenario: "",
            domain: "",
            initialVersionId: "1.0"
        
        },{headers: { 
            'Ocp-Apim-Subscription-Key': subKey,
            'Content-Type': 'application/json'
        }})
}
function putLuisApp (){

}
function deleteLuisApp(luisRegion,id,subKey){
    return axios.delete(`https://${luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${id}`,
        {headers: { 
            'Ocp-Apim-Subscription-Key': subKey,
            'Content-Type': 'application/json'
        }})
}
function postDepartment(array, luisID) {
    return axios.post('/api/department/',{
        friendlyName: array.name,
        name: array.name.replace(/\s/g, ''), 
        accessToken: array.accessToken,
        appID: array.microsoftAppID, 
        appPass: array.microsoftAppPass,
        luisAppID:luisID,
        luisAppVer:'1.0',
        analyticsID: array.analyticsID, 
        confluence: array.confluence, 
        botName: array.botName,
    });
}
function updatePubDepartment(array){
    return axios.put('/api/department/'+array.id+'/publish/',{ 
        luisState: array.luisState
    })
}
function getDepartment(id) {
    return axios.get('/api/department/'+id);
}
function postDepartment() {
    return axios.post('/api/department/');
}
function putDepartment(id) {
    return axios.put('/api/department/'+id);
}
function deleteDepartment(id) {
    return axios.delete('/api/department/'+id);
}

function deleteIntents(id) {
    return axios.delete('/api/department/intents/'+id);
}
module.exports = router