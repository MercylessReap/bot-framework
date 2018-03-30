var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    event: String,
    type: String,
    typeID: String,
    info: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('log', logSchema, 'logs');