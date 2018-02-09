const   mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	User = require('../../models/user');

const saltRounds = 10;

class UserRepository {

	getUsers(callback) {
		console.log('*** UserRepository.getUsers');
		User.count((err, userCount) => {
			var count = userCount;
			console.log(`Users count:' ${count}`);
            
			User.find({}, (err, users) => {
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

		// hash password 
		bcrypt.hash(body.password, saltRounds, function(err, hash) {
			user.password = hash;

			user.save((err, u) => {
				if(err) {
					console.log(`*** UserRepository.insertUser error: ${err}`);
					return callback(err, null);
				}
    
				callback(null, u);
			});

		});

        
	}
}

module.exports = new UserRepository();