var mongoose = require('mongoose');
var teamSchema = new mongoose.Schema({
    avatar: String,
    name: String,
});
	
teamSchema.set('collection', 'team');
var model = mongoose.model('team', teamSchema);
module.exports = model;
