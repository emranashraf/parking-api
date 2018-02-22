const jwt = require('jwt-simple'),
    global = require('./global');


function verifyToken(req, res, next) {
    console.log(req.session.token);
    var token =  req.session.token; //req.header('authorization');
    if (!token) {
        return res.status(401).send({ auth: false, message: 'Unauthorized. No token provided' });
    }

    var payload = jwt.decode(token, global.secret);

    if (!payload) {
        return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid' });
    }

    req.userId = payload.sub;

    next();
}

module.exports = verifyToken;