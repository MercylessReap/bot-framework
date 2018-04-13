var axios = require ('axios');
module.exports = {
// Setting API Functions
postSetting: ()=> {
    return axios.post('/api/setting/');
},
getSettings: ()=> {
    return axios.get('/api/setting/');
},
getSetting: (id) => {
    return axios.get('/api/setting/'+id);
},
putSetting: (array, bingStatus) =>{
    return axios.put('/api/setting/'+array.id,{
        subKey: array.subKey,
        luisRegion: array.luisRegion,
        bingKey: array.bingKey,
        bingStatus:bingStatus
    });
},
deleteSetting: (id)=>{
    return axios.delete('/api/setting/'+id);
},
//Department 
getDepartments:()=>{
    return axios.get('/api/department/');
},
getDepartment:(id)=>{
    return axios.get('/api/department/'+id);
},
postDepartment:(array, luisID) =>{
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
},
updateDepartmentPub:(array)=>{
    return axios.put('/api/department/'+array.id+'/publish/',{ 
        luisState: array.luisState
    })
},


putDepartment:(id)=>{
    return axios.put('/api/department/'+id);
},
deleteDepartment:(id)=>{
    return axios.delete('/api/department/'+id);
},
//Intents
deleteIntents:(id)=> {
    return axios.delete('/api/department/intents/'+id);
},
//Logs Api
postLog:()=> {
    return axios.post('/api/log/');
},
getLogs:()=> {
    return axios.get('/api/log/');
},
/*=========
  Luis Api
===========*/
// Luis App
publishLuisApp:(array) =>{
    api.get('/api/setting/').then((response)=>{
        return axios.post(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${array.appid}/publish`,{
            "versionId": array.appVer,
            "isStaging": array.publishBool,
            "region": response.data[0].luisRegion
        },{headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
postLuisApp:(name) =>{
    api.get('/api/setting/').then((response)=>{
        console.log('sending to luis')
        return axios.post(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/`,
        {
            name: name,
            description: `This is the ${name} application`,
            culture: "en-us",
            usageScenario: "",
            domain: "",
            initialVersionId: "1.0"
        
        },{headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    }).catch((error)=> {return error})  
},
putLuisApp: (name) =>{
    api.get('/api/setting/').then((response)=>{
        console.log('sending to luis')
        return axios.put(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/`,
        {
            name: name,
            description: `This is the ${name} Bot Application`,

        },{headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
deleteLuisApp:(id) =>{
    api.get('/api/setting/').then((response)=>{
        console.log('sending to luis')
    return axios.delete(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${id}`,
        {headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
updateDepApp:(array)=>{
    putLuisApp(array.name)
    .then((response)=>{
        return putDepartment(array)
    }).catch((error)=>{
        return error
    })
},
// Luis App Intents
}
