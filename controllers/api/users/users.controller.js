const userRepo = require('../../../lib/repositories/userRepository'),
util = require('util');

class UserController {

    constructor(router) {
        router.get('/', this.getUsers.bind(this));
        router.post('/', this.insertUser.bind(this));
        router.post('/login', this.login.bind(this));
    }

    getUsers(req, res) {
        console.log('**** getUsers');        
        userRepo.getUsers((err, data) => {
            if(err) {
                console.log('*** getUsers error:' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getUsers ok');
                res.json(data.users);
            }
        });
    }

    insertUser(req, res) {
        console.log('*** insertUser');
        console.log(req.body);
        userRepo.insertUser(req.body, (err, user) => {
            if(err) {
                console.log('*** insertUser error:' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', user: null});
            }
            else {
                console.log('*** insertUser ok');
                res.json({ status: true, error: null, user: user });
            }
        });
    }

    login(req, res) {
        console.log(`*** login`);
        console.log(req.body);
        userRepo.login(req.body, (err, user) => {
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

module.exports = UserController;