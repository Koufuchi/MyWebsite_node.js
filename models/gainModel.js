var mongoose = require('mongoose');
var gainSchema = new mongoose.Schema({
    image: String,
    title: String,
    content: String,
});
	
gainSchema.set('collection', 'gain');
var model = mongoose.model('gain', gainSchema);
module.exports = model;
