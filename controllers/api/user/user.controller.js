const userRepo = require('../../../lib/repositories/userRepository'),
util = require('util'),
verifyToken = require('../../../lib/veriyToken');

class UserController {

    constructor(router) {
        router.get('/', verifyToken, this.getUsers.bind(this));
        router.post('/', verifyToken, this.insertUser.bind(this));
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
}

module.exports = UserController;