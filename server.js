const express   = require('express'),
    bodyParser  = require('body-parser'),

    router      = require('./routes/router'),
    database    = require('./lib/database'),
    app         = express(),
    port        = 4000;

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
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        
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