var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
	
userSchema.set('collection', 'user');
var model = mongoose.model('user', userSchema);
module.exports = model;
