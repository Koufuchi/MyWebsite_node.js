var mongoose = require('mongoose');
var carouselSchema = new mongoose.Schema({
    image: String,
    title: String,
});
	
carouselSchema.set('collection', 'carousel');
var model = mongoose.model('carousel', carouselSchema);
module.exports = model;
