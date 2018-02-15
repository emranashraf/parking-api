const   mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	firstName       : { type: String, required: true, trim: true },
	lastName        : { type: String, required: true, trim: true },
	email           : { type: String, required: true, trim: true },
	password        : { type: String, required: true, trim: true }    
});

// this method is middle ware for the save event of user schema
UserSchema.pre('save', function(next) {
	console.log('**** hasing password');
	var user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.hash(user.password, null, null, (err,hash) => {
		if (err) {
			return next(err);
		}

		user.password = hash;
		next();
	});
		
})

module.exports = mongoose.model('User', UserSchema, 'users');