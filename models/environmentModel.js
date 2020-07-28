var mongoose = require('mongoose');
var environmentSchema = new mongoose.Schema({
    image: String,
    title: String,
});
	
environmentSchema.set('collection', 'environment');
var model = mongoose.model('environment', environmentSchema);
module.exports = model;
