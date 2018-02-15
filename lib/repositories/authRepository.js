const   mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	jwt = require('jwt-simple'),
	User = require('../../models/user'),
	global = require('../global');

class AuthRepository {

	login(body, callback) {
		console.log('*** UserRepository.login');
				
		var user = User.findOne({ email: body.email }, function (err, user) {
			if (err) {
				console.log(`*** UserRepository.login error: ${err}`);
				return callback(err, null);
			}
			
			if (!user) {
				console.log(`*** UserRepository.login error`);
				return callback('user name or password invalid', null);
			}

            // create token
			var token = this.createToken(user);
			
			// Load hash from your password DB.			
			bcrypt.compare(body.password, user.password, function(err, isMatch) {				
				if (!isMatch) {					
					 console.log(`*** UserRepository.login error`);					 
					 return callback('user name or password invalid', null);
				}
				else  {
					callback(null, token);
				}
			});

			
		});
    }
    
    // create token
    createToken(user) {
        var payload = { sub: user._id };
        var token = jwt.encode(payload, global.secret, 'HS256', '');

        return token;
    }
}