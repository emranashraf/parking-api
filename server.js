const express       = require('express'),
    bodyParser      = require('body-parser'),
    session         = require('client-sessions'),

    router          = require('./routes/router'),
    database        = require('./lib/database'),
    app             = express(),
    port            = 4000,
    cors            = require('cors'),
    uploadConfig    = require('./lib/configLoader').uploadConfig;
    

class Server {

    constructor() {
        this.initExpressMiddleWare();
        this.dbConnect();
        this.initRoutes();
        this.start();
    }

    start() {
        app.listen(port, (err) => {
            console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
        });
    }

    initExpressMiddleWare() {
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true }));
        // url will be like this http://localhost/uploads/image.png
        app.use('/' + uploadConfig.uploadUrl, express.static(uploadConfig.uploadFolder));
        app.use(bodyParser.json());

        // session
        app.use(session({
            cookieName: 'session',
            secret: 'eg[isfd-8yF9-7w23d565675dfg15df{}+Ijsli;;to8',
            // how long the session will live in milliseconds. After that the cookie is invalidated
            duration: 24 * 60 * 60 * 1000, // 24 hours
            activeDuration: 5 * 60 * 1000, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
            cookie: {
                // allow the user to lengthen their session, if the session is 28 minutes old and the user sends
                // another request activeDuration will extend the session's life. In this case 5 minutes                
                httpOnly: true, // when true, cookie is not accessible from javascript
                secure: false, // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
                ephemeral: true   
            }
        }));
        
        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    dbConnect() {
        database.open(() => {
            //Set NODE_ENV to 'development' and uncomment the following if to only run
            //the seeder when in dev mode
            //if (process.env.NODE_ENV === 'development') {
            //  seeder.init();
            //} 
            //seeder.init();
        });
    }

    initRoutes() {
        router.load(app, './controllers');

        // redirect all others to the index (HTML5 history)
        app.all('/*', (req, res) => {
            res.sendFile(__dirname +  '/src/index.html');
        });
    }

}

var server = new Server();