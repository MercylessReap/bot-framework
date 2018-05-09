var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingSchema = new Schema({

    subscriptionKey: { type: String, unique: true},
    bingApiKey: String,
    bingSpellCheckEnabled:{ type: Boolean, default: false },
    luisRegion: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('setting', settingSchema, 'config');