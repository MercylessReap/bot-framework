const express = require('express'),
    router = express.Router(),
    builder = require('botbuilder'),
    axios = require('axios');

//Array handlers for department bots
const connector = [],
    bot = [],
    recognizer = [],
    LuisModelUrl = [];

function loadDialog(intents) {
    // Create connector and listen for messages
    console.log('bot refresh diolag ran')
    intents.forEach(botDialog)

}

function botDialog(item, index) {

    if (item.disabled == true) {
        bot[item.department].dialog(item.name, (session) => {
            session.endDialog('I am sorry, this feature has been disabled');
        }).triggerAction({
            matches: console.log(item.name)
        })
    } else if (item.entities == true) {
        bot[item.department].dialog(console.log(item.name), (session) => {

            session.endDialog('I am sorry, this feature has yet to be coded, seems my programmer is being lazy');
        }).triggerAction({
            matches: item.name
        })
    } else {
        let i = random(item.answer)
        bot[item.department].dialog(item.name, (session) => {
            session.endDialog(item.answer[i]);
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
module.exports = {
    // This function Creates a bot for every department
    start: () => {

        //
        axios.all([axios.get('/api/setting'), axios.get('/api/department'), axios.get('/api/intent')])
            .then(axios.spread((setting, departments, intents) => {
                // Both requests are now complete
                let luisRegion = setting.data[0].luisRegion,
                    subKey = setting.data[0].subscriptionKey,
                    luisState
                return departments.data.forEach((item, index) => {
                    if (item.luisState === 'Staging') {
                        luisState = true
                    } else {
                        luisState = false
                    }
                    LuisModelUrl[item._id] = `https://${luisRegion}.api.cognitive.microsoft.com/luis/v2.0/apps/${item.luisAppID}?subscription-key=${subKey}&staging=${luisState}`;
                    connector[item._id] = new builder.ChatConnector({
                        appId: item.microsoftBotAppID,
                        appPassword: item.microsoftBotAppPass
                    });

                    router.post(`/${item.name}/messages`, connector[item._id].listen())

                    bot[item._id] = new builder.UniversalBot(connector[item._id], (session) => {
                        session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
                    });
                    recognizer[item._id] = new builder.LuisRecognizer(LuisModelUrl[item._id]);
                    bot[item._id].recognizer(recognizer[item._id]);
                    //loadDialog(intents.data)
                    intents.data.forEach((item, index) => {

                        let i = random(item.answer),
                            name = item.name
                        bot[item.department].dialog(name, (session) => {
                            session.endDialog(item.answer[i]);
                        }).triggerAction({
                            matches: name
                        })

                    })
                });

            }))
            .catch((error) => console.log(error));
    },


}