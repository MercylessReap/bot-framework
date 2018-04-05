var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    userID: String,
    typeID: String,
    type: String,
    info: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('log', logSchema, 'logs');