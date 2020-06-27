const path = require('path')
const express = require('express');
const cors = require('cors');
// Import the entire Routes folder and searches for the index.js file
const apiRouter = require('./routes');

let app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Same as body-parser

// Middleware Routers
app.use('/api', apiRouter);

// Middleware for Client
let clientPath = path.join(__dirname, '../client');
app.use(express.static(clientPath));

// Listen on localhost:3000/
app.listen(3000);
