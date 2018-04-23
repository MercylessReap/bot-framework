var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utteranceSchema = new Schema({
    intentId: String,
    luisId: String,
    text: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('utterance', utteranceSchema, 'utterances');