var mongoose = require('mongoose');
var businessSchema = new mongoose.Schema({
    name: String,
    content: String,
});
	
businessSchema.set('collection', 'business');
var model = mongoose.model('business', businessSchema);
module.exports = model;
