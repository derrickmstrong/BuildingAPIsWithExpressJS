const express = require('express');
// Import all the routes (get, post, put, delete) from chirps.js
let chirpsRouter = require('./chirps');

let router = express.Router();

router.use('/chirps', chirpsRouter);

module.exports = router;
