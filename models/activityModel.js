var mongoose = require('mongoose');
var activitySchema = new mongoose.Schema({
    image: String,
    title: String,
    content: String,
});
	
activitySchema.set('collection', 'activity');
var model = mongoose.model('activity', activitySchema);
module.exports = model;
