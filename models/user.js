const   mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName       : { type: String, required: true, trim: true },
	lastName        : { type: String, required: true, trim: true },
	email           : { type: String, required: true, trim: true },
	password        : { type: String, required: true, trim: true }    
});

module.exports = mongoose.model('User', UserSchema, 'users');