// let's go!
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();
server.express.use(cookieParser());
server.express.use(bodyParser.json());
server.express.use((req, res, next) => {
    const {token} = req.cookies;
    if (token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        // put the userId onto the req for future requests to access
        req.userId = userId;
    }
    next();
});

// Todo use express middleware to populate current user
server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server in now running on port http://localhost:${deets.port}`)
});
