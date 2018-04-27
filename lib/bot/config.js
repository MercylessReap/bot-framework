var builder = require('botbuilder')
    spellService = require('./spell-service');
var axios = require('axios'),
    exports = module.exports = {};
// Create connector and listen for messages
exports.connector = new builder.ChatConnector({
    appId: null,
    appPassword: null
});

exports.loadDialog = (url,connector,LuisModelUrl) =>{
    
    // Create connector and listen for messages
    var bot = new builder.UniversalBot(connector, (session) =>{
      session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);  
      });
    var recognizer = recognizer = new builder.LuisRecognizer(LuisModelUrl);
    bot.recognizer(recognizer);
    
    axios.get(url+'/api/intent')
    .then((response) => {
        response.data.forEach(botDialog)
        console.log('api ran')
       
        function botDialog(item, index) {
            
            if(item.disabled == true){
                bot.dialog(item.name, (session) =>{
                session.endDialog('I am sorry, this feature has been disabled');
                }).triggerAction({
                    matches: console.log(item.name)
                })
            }else if(item.entities == true){
                bot.dialog(console.log(item.name), (session) =>{
                
                session.endDialog('I am sorry, this feature has yet to be coded, seems my programmer is being lazy');
                }).triggerAction({
                    matches: item.name
                })
            }else{
                let i = random(item.answer)
                bot.dialog(item.name, (session)=> {
                session.endDialog(item.answer[i]);
                }).triggerAction({
                    matches: item.name
                
                })
                
            }
        }  
    }).catch((error)=>{
        console.log(error)
    })
} 

function random(array){
    let randomNumber
    randomNumber = Math.floor(Math.random() * array.length)
    return randomNumber
  }