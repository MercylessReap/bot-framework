var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    name:{type: String, lowercase: true, unique: true},
    appID: String,
    appPass: String,
    analyticsID: String,
    confluence: String,
    botName:{type: String, lowercase: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('department', departmentSchema, 'departments');