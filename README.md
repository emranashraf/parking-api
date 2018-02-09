### Running the Application Locally

1. Install Node.js (6.5 or higher) and MongoDB (3.2 or higher) on your dev box

    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/installation


2. Execute `mongod -f '/Users/emran/My Cloud/mongodata/mongod.conf'` to start the MongoDB (with config you data directory is different than default one) daemon if it's not already running  

3. Install Nodemon and Gulp: `npm install nodemon gulp -g`

4. Run `npm install` to install app dependencies

5. Run `npm start`