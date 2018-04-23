var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    friendlyName:{type: String},
    name:{type: String, unique: true},
    sparkAccessToken:{type: String, default:''},
    microsoftBotAppId: {type: String, default:''},
    microsoftBotAppPass: {type: String, default:''},
    luisAppId: String,
    luisAppVer: String,
    luisState: {type: String, default:''},
    luisPubDate: { type: Date},
    analyticsId: {type: String, default:''},
    confluence: {type: String, default:''},
    botName:{type: String, lowercase: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('department', departmentSchema, 'departments');