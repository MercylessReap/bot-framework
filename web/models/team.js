var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    leader: Array,
    members: Array,
    department: {type: String, Upercase: true, unique: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('team', teamSchema, 'teams');