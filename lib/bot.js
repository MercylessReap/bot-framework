const express = require('express'),
    router = express.Router(),
    builder = require('botbuilder'),
    axios = require('axios');


    module.exports= {
        init : init,
        loadDialog: loadDialog,
        botDialog: botDialog,
        start:start
    
    };
    //Array handlers for department bots
    var connector = [],
        bot = [],
        recognizer = [],
        LuisModelUrl = [];

    function init(router){
        axios.all([axios.get('/api/setting'), axios.get('/api/department'), axios.get('/api/intent')])
        .then(axios.spread((setting, departments, intents) => {
        let luisRegion = setting.data[0].luisRegion,
                 subKey = setting.data[0].subscriptionKey,
                 luisState
                 departments.data.forEach((item,index)=>{
                 // Both requests are now complete
                 if (item.luisState === 'Staging') {
                     luisState = true
                 } else {
                     luisState = false
                 }
                 
                 LuisModelUrl[item._id] = `https://${luisRegion}.api.cognitive.microsoft.com/luis/v2.0/apps/${item.luisAppId}?subscription-key=${subKey}&staging=${luisState}`;
                 
                 connector[item._id] = new builder.ChatConnector({
                     appId: item.microsoftBotAppId,
                     appPassword: item.microsoftBotAppPass
                 });
                
                router.get(`/${item.name}/messages`, (req,res)=> {
                    res.send(item.name);
                })
                router.post(`/${item.name}/messages`,connector[item._id].listen());

                bot[item._id] = new builder.UniversalBot(connector[item._id], (session) => {
                    session.send(`Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance. Or please contact ${item.friendlyName}`, session.message.text);
                });
                
                recognizer[item._id] = new builder.LuisRecognizer(LuisModelUrl[item._id]);
                bot[item._id].recognizer(recognizer[item._id]);
            })
            loadDialog(intents.data)
        })).catch((error) =>{ console.log(error)})
   
    }
        
    function loadDialog(intents) {
        // listen for messages
        console.log('bot refresh diolag ran')
        intents.forEach(botDialog)
    }

    function botDialog(item, index) {

        if (item.disabled == true) {
            bot[item.department].dialog(item.name, (session) => {
                session.endDialog('I am sorry, this feature has been disabled');
            }).triggerAction({
                matches: item.name
            })
        } else if (item.entities == true) {
            bot[item.department].dialog(item.name, (session) => {

                session.endDialog('I am sorry, this feature has yet to be coded, seems my programmer is being lazy');
            }).triggerAction({
                matches: item.name
            })
        } else {
            let i = random(item.answer)
            console.log(`loading dialog ${item.name}`)
            bot[item.department].dialog(item.name, (session) => {
                session.endDialog(item.answer);
            }).triggerAction({
                matches: item.name
            })
        }
    }

    function random(array) {
        let randomNumber
        randomNumber = Math.floor(Math.random() * array.length)
        return randomNumber
    }

    function start(router){
        //
        init(router)

    }
