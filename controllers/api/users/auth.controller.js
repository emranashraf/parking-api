const authRepo = require('../../../lib/repositories/authRepository'),
util = require('util');

class AuthController  {

    constructor(router) {        
        router.post('/login', this.login.bind(this));
    }

    login(req, res) {        
        console.log(`*** login`);
        console.log(req.body);
        authRepo.login(req.body, (err, user) => {
            if (err) {
                console.log('*** login error:' + util.inspect(err));
                res.json({status: false, error: 'Login failed' });
            } else {
                console.log('*** login ok');
                res.json({ status: true, error: null, data: user });
            }
        })
    }
}

module.exports = AuthController;