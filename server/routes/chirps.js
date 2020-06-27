const express = require('express');
// Import chirpStore in order to use methods in chirps.js
const chirpsStore = require('../chirpstore');

// Create Router
let router = express.Router();

// Get route for all chirps
router.get('/', (req, res) => {
    res.send(chirpsStore.GetChirps());
});

// Get route for chirps at specific id parameter
router.get('/:id?', (req, res) => {
  let id = req.params.id;
  if (id) {
    res.json(chirpsStore.GetChirp(id));
  } else {
    res.send(chirpsStore.GetChirps());
  }
});

// Post route
router.post('/', (req, res) => {
  // Optional setup
  // let chirpObj = {
  //   username: res.body.username,
  //   message: res.body.message
  // }
  // chirpsStore.CreateChirp(chirpObj)
  chirpsStore.CreateChirp(req.body);
  res.sendStatus(200);
});

// Put/Update route
router.put('/:id?', (req, res) => {
  const id = req.params.id;
  // Optional setup
  // let chirpObj = {
  //   username: res.body.username,
  //   message: res.body.message
  // }
  // chirpsStore.UpdateChirp(id, chirpObj);
  const chirp = req.body;
  if (id) {
    chirpsStore.UpdateChirp(id, chirp);
    res.send(`Updated chirp id: ${id}`);
  } else {
    res.sendStatus(404);
  }
});

// Delete route
router.delete('/:id?', (req, res) => {
  const id = req.params.id;
  if (id) {
    chirpsStore.DeleteChirp(id);
    res.send(chirpsStore.GetChirps());
  } else {
    res.sendStatus(404);
  }
});

// Export Router to pass all the routes (ie. get, post, put, delete) into index.js
module.exports = router;
