const   mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	jwt = require('jwt-simple'),
	User = require('../../models/user'),
	global = require('../global'),
	moment = require('moment');

class AuthRepository {

	login(body, callback) {
		console.log('*** AuthRepository.login');
				
		var user = User.findOne({ email: body.email }, function (err, user) {
			if (err) {
				console.log(`*** AuthRepository.login error: ${err}`);
				return callback(err, null);
			}
			
			if (!user) {
				console.log(`*** AuthRepository.login error`);
				return callback('user name or password invalid', null);
			}

			// create token			
			var token = createToken(user);
			
			// Load hash from your password DB.			
			bcrypt.compare(body.password, user.password, function(err, isMatch) {				
				if (!isMatch) {					
					 console.log(`*** AuthRepository.login error`);					 
					 return callback('user name or password invalid', null);
				}
				else  {
					callback(null, token);
				}
			});			
		});
    }
}

// create token
function createToken(user) {
	console.log('*** AuthRepository.createToken');
	var payload = { sub: user._id, exp: moment().add(1, 'days').unix() };
	var token = jwt.encode(payload, global.secret);

	return token;
}

module.exports = new AuthRepository();