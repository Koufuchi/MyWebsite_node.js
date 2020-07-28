var mongoose = require('mongoose');
var ownerSchema = new mongoose.Schema({
    image: String,
    name: String,
    job: String,
    phone: String,
    email: String,
});
	
ownerSchema.set('collection', 'owner');
var model = mongoose.model('owner', ownerSchema);
module.exports = model;
