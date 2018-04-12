var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var intentSchema = new Schema({
    name: { type: String },
    friendlyName: { type: String },
    luisID: String,
    synonyms:Array,
    answer:Array,
    department: String,
    diasbled: { type: String, default: 'false' },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('intent', intentSchema, 'intents');