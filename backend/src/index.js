// let's go!
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// Todo use express middleware to handle cookies (JWT)
// Todo use express middleware to populate current user
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server in now running on port http://localhost:${deets.port}`)
});
