var mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    address: String,
    phone: String,
    email: String,
});

contactSchema.set('collection', 'contact');
var model = mongoose.model('contact', contactSchema);
module.exports = model;
