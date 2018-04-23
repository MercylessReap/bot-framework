var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    disabled: { type: Boolean, default: false },
    email:{type: String, lowercase: true, unique: true},
    name: String,
    token: {type: String, unique: true},
    type: String,
    password: String,
    department: String,
    access: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userSchema, 'users');