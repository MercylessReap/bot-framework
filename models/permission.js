var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    wizzard: Array,
    members: Array,
    department: {type: Object, unique: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('permission', permissionSchema, 'permissions');