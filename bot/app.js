// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');
var Store = require('./store');
var spellService = require('./spell-service');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());



var recognizer

var bot = new builder.UniversalBot(connector, function (session) {
    //this is where the gloabal varriables are stored
    //recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
    
    // If a department is specified, it will make to see if in accepted list
    // then return correct luis model url for the departments code to be used
    if(session.message.text == "hi"){
        console.log(recognizer = new builder.LuisRecognizer(session.message.text))
    }else{
        //use global
        recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
    }
    
});

// You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
// This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/

//needs to be dynamic baised on the Application
//var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);

// this can be static
bot.recognizer(recognizer);

var intent = ['Greeting','Support',''];
var answer = ['Hi!', 'this is support',''];
var dialog = [{ "intent":intent[0], "answer":answer[0]}, { "intent":intent[1], "answer":answer[1]}]

dialog.forEach(botDialog)

function botDialog(item, index) {
    bot.dialog(item.intent, function (session) {
    session.endDialog(item.answer);
    }).triggerAction({
        matches: item.intent
  })
}