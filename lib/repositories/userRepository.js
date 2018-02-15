const   mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	jwt = require('jwt-simple'),
	User = require('../../models/user'),
	global = require('../global');

class UserRepository {

	getUsers(callback) {
		console.log('*** UserRepository.getUsers');
		User.count((err, userCount) => {
			var count = userCount;
			console.log(`Users count:' ${count}`);
			
			// -password mean don't load this property
			User.find({}, '-password -__v', (err, users) => {
				if(err) {
					console.log(`*** UserRepository.getUsers error:  ${err}`);
					return callback(err);
				}
				callback(null, {
					count: count,
					users: users
				});
			});
		});
	}

	insertUser(body, callback) {
		console.log('*** UserRepository.insertUser');
		var user = new User();
             
		user.email = body.email;        
		user.firstName = body.firstName;
		user.lastName = body.lastName;
		user.password = body.password;

		user.save((err, u) => {
			if(err) {
				console.log(`*** UserRepository.insertUser error: ${err}`);
				return callback(err, null);
			}
			callback(null, u);
		});        
	}
}

module.exports = new UserRepository();