var builder = require('botbuilder');
var axios = require('axios');
// This function Creates a bot for every department
function startBot(department){
    //be it one or many bots this array can handle it
    const connector=[], bot = [], recognizer = [],
        LuisModelUrl=[];
    //details of single bot to be parsed to array    
    let id = department.id, appID = department.appID,
        appPassword = department.appPassword,
        name = department.name,luisRegion = department.luisRegion,
        luisID = department.luisID,subKey = department.subkey, 
        staging = department.staging;

    LuisModelUrl[id] =`https://${luisRegion}.api.cognitive.microsoft.com/luis/v2.0/apps/${luisID}?subscription-key=${subKey}&staging=${staging}`;
    //single bot being created in a multi-bot array
    connector[id] = new builder.ChatConnector({
        appId: appID,
        appPassword: appPassword
    });

    server.post(`/${name}/messages`, connector[id].listen());

    bot[department.id] = new builder.UniversalBot(connector[id]);
    recognizer[id] = new builder.LuisRecognizer(LuisModelUrl[id]);
    bot[id].recognizer(recognizer[id]);    
}

function loadDialog (intents){
    // Create connector and listen for messages
    intents.forEach(botDialog)
    console.log('api ran')
}

function botDialog(item, index) {
    if(item.disabled == true){
      bot[item.department].dialog(item.name, (session)=>{
      session.endDialog('I am sorry, this feature has been disabled');
      }).triggerAction({
          matches: console.log(item.name)
        })
    }else if(item.entities == true){
      bot[item.department].dialog(console.log(item.name),(session)=>{
       
       session.endDialog('I am sorry, this feature has yet to be coded, seems my programmer is being lazy');
      }).triggerAction({
          matches: item.name
        })
    }else{
      let i = random(item.answer)  
      bot[item.department].dialog(item.name,(session)=>{
      session.endDialog(item.answer[i]);
      }).triggerAction({
          matches: item.name
        })
    }
}

function random(array){
    let randomNumber
    randomNumber = Math.floor(Math.random() * array.length)
    return randomNumber
  }