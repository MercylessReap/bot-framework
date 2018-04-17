const express = require('express')
    , router = express.Router()
    , builder = require('botbuilder')
    , axios = require('axios')
    , bot = require(rootDir+'/lib/bot');


bot.start()
function start(){
    //Array handlers for department bots
    const connector=[], bot = [], recognizer = [],
          LuisModelUrl=[];
    //
    axios.all([axios.get('/api/setting'), axios.get('/api/department')])
    .then(axios.spread((setting, departments)=> {
        // Both requests are now complete
        let luisRegion = setting.data[0].luisRegion, subKey = setting.data[0].subscriptionKey, luisState
        
        departments.data.forEach((item, index)=> {
        
            if(item.luisState === 'Staging'){luisState=true}else{luisState=false}
            
            LuisModelUrl[item._id] =`https://${luisRegion}.api.cognitive.microsoft.com/luis/v2.0/apps/${item.luisAppID}?subscription-key=${subKey}&staging=${luisState}`;
            
            connector[item._id] = new builder.ChatConnector({
                appId: item.microsoftBotAppID,
                appPassword: item.microsoftBotAppPass
            });
            
            router.get(`/${item.name}/messages`,(req,res)=>{res.send('Hi')})
            
            router.post(`/${item.name}/messages`, connector[item._id].listen())
                
            bot[item._id] = new builder.UniversalBot(connector[item._id], (session) =>{
                session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);  
            });
            
            recognizer[item._id] = new builder.LuisRecognizer(LuisModelUrl[item._id]);
            
            bot[item._id].recognizer(recognizer[item._id]);   
        });

    }))
    .catch((error)=>consol.log(error)); 
}  

module.exports = router





