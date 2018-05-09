const builder = require('botbuilder'),
      //spellService = require('./spell-service'),
      api = require(rootDir+'/lib/api');

const LuisModelUrl = []
    , connector = []
    , bot = []
    , oldBotUrl = []
    , recognizer = [];
   
    LuisModelUrl['5ad12a0983863e3d605cc0a0'] ='https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/89b3e679-1506-4e5d-85bf-8afd5c81b702?subscription-key=fc069d5a824d4f98b3e995df1ddbcde9&staging=true',
      // Create connector and listen for messages
      connector['5ad12a0983863e3d605cc0a0'] = new builder.ChatConnector({
          appId: null,
          appPassword: null
      });

function start(router){
    api.getDepartments().then((departments) => {
        departments.data.forEach((item,index)=>{
            router.get(`/${item.name}/messages`, (req,res)=> {
                res.send(item.name);
            })
            router.post(`/${item.name}/messages`,connector['5ad12a0983863e3d605cc0a0'].listen());
        })        
    }).catch((error)=>console.log(error))
}

function botConnector(){
    api.getDepartments().then((response)=>{
        // Create connector and listen for messages
        
    }).catch((error)=>console.log(error))

}

function loadDialog (id) {
    
    // Create connector and listen for messages
    bot[id] = new builder.UniversalBot(connector[id], (session) =>{
        session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);  
    });
    recognizer[id]= new builder.LuisRecognizer(LuisModelUrl[id]);

    api.getIntents()
    .then((response) => {
        let intents = response.data

        bot[id].recognizer(recognizer[id]);

        intents.forEach(botDialog)
        console.log('api ran')
       
        function botDialog(item, index) {
            if(item.department === id){
                console.log('matched')
                if(item.disabled == true){
                    bot[id].dialog(item.name, (session) =>{
                    session.endDialog('I am sorry, this feature has been disabled');
                    }).triggerAction({
                        matches: console.log(item.name)
                    })
                }else if(item.entities == true){
                    bot[id].dialog(console.log(item.name), (session) =>{
                    
                    session.endDialog('I am sorry, this feature has yet to be coded, seems my programmer is being lazy');
                    }).triggerAction({
                        matches: item.name
                    })
                }else{
                    let i = random(item.answer)
                    bot[id].dialog(item.name, (session)=> {
                    session.endDialog(item.answer[i]);
                    }).triggerAction({
                        matches: item.name
                    
                    })
                    
                }
            }
        }
    }).catch((error)=>console.log(error))
    
} 

function loadDialogs () {

    axios.get('/api/intent')
    .then((response) => {
        let intents = response.data
        for(let i=0; i < intents.length; i++){
            bot[intents[i].department] = new builder.UniversalBot(connector['5ad12a0983863e3d605cc0a0'], (session) =>{
                session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);  
            });
            recognizer[intents[i].department]= new builder.LuisRecognizer(LuisModelUrl['5ad12a0983863e3d605cc0a0']);
            bot[intents[i].department].recognizer(recognizer[intents[i].department]);
        }
        

        intents.forEach(botDialogs)
        console.log('api ran')
       
        function botDialogs(item, index) {

            console.log(item)
            if(item.disabled == true){
                bot[item.department].dialog(item.name, (session) =>{
                    session.endDialog('I am sorry, this feature has been disabled');
                }).triggerAction({
                    matches: item.name
                })
                }else if(item.entities == true){
                    bot[item.department].dialog(item.name, (session) =>{
                    
                    session.endDialog('I am sorry, this feature has yet to be coded, seems my programmer is being lazy');
                    }).triggerAction({
                        matches: item.name
                    })
                }else{
                    let i = random(item.answer)
                    bot[item.department].dialog(item.name, (session)=> {
                    session.endDialog(item.answer[i]);
                    }).triggerAction({
                        matches: item.name
                    
                })
                    
            }
        }
    }).catch((error)=>console.log(error))
    
} 

function random(array){
    let randomNumber
    randomNumber = Math.floor(Math.random() * array.length)
    return randomNumber
}

module.exports = {
    connector:connector['5ad12a0983863e3d605cc0a0'],
    LuisModelUrl:LuisModelUrl['5ad12a0983863e3d605cc0a0'],
    start:start,
    loadDialog:loadDialog,
    loadDialogs:loadDialogs
    
};