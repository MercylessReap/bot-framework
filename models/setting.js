var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingSchema = new Schema({

});

module.exports = mongoose.model('setting', settingSchema, 'settings');