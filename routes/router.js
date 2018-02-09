const  fs       = require('fs'),
	path     = require('path'),
	express  = require('express') 


// purpose of this class to create routes automatically once you create the api folder in controllers api
// then you don't need to create separate for each folder
class Router {

	constructor() {

	}

	// called once during initial server startup
	load(app, folderName) {

		if(!this.startFolder) this.startFolder = path.basename(folderName);

		// read all folder in the supplied folder
		fs.readdirSync(folderName).forEach((file) => {

			const fullName = path.join(folderName, file);
			const stat = fs.lstatSync(fullName);

			if(stat.isDirectory()) {
				// Recursively walk-through folders
				this.load(app, fullName);
			} else if(file.toLowerCase().indexOf('.js')) {
				// grab path to javascript file and use it to contrcut the route
				let dirs = path.dirname(fullName).split(path.sep);

				if(dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
					dirs.splice(0,1);
				}

				const router = express.Router();
				// Generate the route
				const baseRoute = '/' + dirs.join('/');
				console.log('Created route: ' + baseRoute + ' for ' + fullName);

				// Load the javascript file ("controller") and pass the router to it
				const controllerClass = require('../' + fullName);
				const controller = new controllerClass(router);
				// Associate the route with the router
				app.use(baseRoute, router);
			}
		});
	}
}

module.exports = new Router();