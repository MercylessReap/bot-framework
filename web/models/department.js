var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    friendlyName:{type: String},
    name:{type: String, unique: true},
    sparkAccessToken:{type: String, default:''},
    microsoftBotAppID: {type: String, default:''},
    microsoftBotAppPass: {type: String, default:''},
    luisAppID: String,
    luisAppVer: String,
    luisState: {type: String, default:''},
    luisPubDate: { type: Date},
    analyticsID: {type: String, default:''},
    confluence: {type: String, default:''},
    botName:{type: String, lowercase: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('department', departmentSchema, 'departments');