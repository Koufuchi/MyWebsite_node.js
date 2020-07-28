var mongoose = require('mongoose');
var skillSchema = new mongoose.Schema({
    image: String,
    title: String,
    content: String,
});
	
skillSchema.set('collection', 'skill');
var model = mongoose.model('skill', skillSchema);
module.exports = model;
