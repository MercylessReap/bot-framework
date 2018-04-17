var axios = require ('axios');
module.exports = {
// Setting API Functions
postSetting: ()=> {
    return axios.post(`/api/setting/`);
},
getSettings: ()=> {
    return axios.get(`/api/setting/`);
},
getSetting: (id) => {
    return axios.get(`/api/setting/${id}`);
},
putSetting: (array, bingStatus) =>{
    return axios.put(`/api/setting/${array.id}`,{
        subKey: array.subKey,
        luisRegion: array.luisRegion,
        bingKey: array.bingKey,
        bingStatus:bingStatus
    });
},
deleteSetting: (id)=>{
    return axios.delete(`/api/setting/${id}`);
},
//Department 
getDepartments:()=>{
    return axios.get(`/api/department/`);
},
getDepartment:(id)=>{
    return axios.get(`/api/department/${id}`);
},
postDepartment:(array, luisID) =>{
    return axios.post(`/api/department/`,{
        friendlyName: array.name,
        name: array.name.replace(/\s/g, ''), 
        accessToken: array.sparkAccessToken,
        appID: array.microsoftAppID, 
        appPass: array.microsoftAppPass,
        luisAppID:luisID,
        luisAppVer:'1.0',
        analyticsID: '', 
        confluence: '', 
        botName: array.botName,
    });
},
trainDepartment:(id)=>{
    return axios.put(`/api/department/${array.id}/train/`)
},
publishDepartment:(array)=>{
    return axios.put(`/api/department/${array.id}/publish/`,{ 
        luisState: array.luisState
    })
},
putDepartment:(array)=>{
    return axios.put(`/api/department/${array.id}`,{
        friendlyName: array.friendlyName,
        name: array.friendlyName.replace(/\s/g, ''), 
        accessToken: array.sparkAcessToken,
        appID: array.microsoftAppID, 
        appPass: array.microsoftAppPass,
        analyticsID: array.analyticsID, 
        confluence: array.confluence, 
        botName: array.botName,
        updated:new Date
    });
},
deleteDepartment:(id)=>{
    return axios.delete(`/api/department/${id}`);
},
//Intents
getIntents: ()=>{
    return axios.get(`/api/intent/`);
},
getIntent: (id)=>{
    return axios.get(`/api/intent/${id}`);
},
postIntent: (array, luisID)=>{
    return axios.post(`/api/intent/`,{
      name:array.name.replace(/\s/g, ''),
      friendlyName:array.name,
      department:array.department,
      question: array.synonyms,
      answer:array.answer,
      status:array.disabled,
      luisID:luisID,
      updated:array.updated
    });
},
putIntent: (array)=>{
    return axios.put(`/api/intent/${array.id}`,{
        
    });
},
deleteIntents:(id)=>{
    return axios.delete(`/api/department/intents/${id}`);
},
//Logs Api
postLog:()=> {
    return axios.post(`/api/log/`);
},
getLogs:()=> {
    return axios.get(`/api/log/`);
},
/*=========
  Luis Api
===========*/
// Luis App
luisTrainStatus: (array)=>{
    return axios.get(`/api/setting/`)
    .then((response)=>{
        return axios.get(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${array.luisAppID}/versions/${array.luisAppVer}/train`,{
        headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
trainLuisApp: (array)=>{
    return axios.get('/api/setting/')
    .then((response)=>{
        return axios.post(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${array.luisAppID}/versions/${array.luisAppVer}/train`,{
        headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
publishLuisApp:(array) =>{
    let publishBool;
    if(array.luisState === 'Staging'){publishBool=true}else{publishBool=false}
    return axios.get('/api/setting/')
    .then((response)=>{
        return axios.post(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${array.luisAppID}/publish`,{
            "versionId": array.luisAppVer,
            "isStaging": publishBool,
            "region": response.data[0].luisRegion
        },{headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
postLuisApp:(name) =>{
    return axios.get('/api/setting/')
    .then((response)=>{
        console.log('sending to luis')
        return axios.post(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/`,
        {
            name: name.replace(/\s/g, ''),
            description: `This is the ${name} application`,
            culture: "en-us",
            usageScenario: "",
            domain: "",
            initialVersionId: "1.0"
        
        },{headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},
putLuisApp: (name, id) =>{
    return axios.get('/api/setting/')
    .then((response)=>{
        console.log('sending to luis')
        return axios.put(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${id}`,
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
    axios.get('/api/setting/').then((response)=>{
        console.log('sending to luis')
    return axios.delete(`https://${response.data[0].luisRegion}.api.cognitive.microsoft.com/luis/api/v2.0/apps/${id}`,
        {headers: { 
            'Ocp-Apim-Subscription-Key': response.data[0].subscriptionKey,
            'Content-Type': 'application/json'
        }})
    })
},

// Luis App Intents
}
