const express = require("express");

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

const router = express.Router();

// Create all our routes and set up logic within those routes where required.

router.get('/', function (req, res) {
    res.redirect('/index');
  });
  
  
  // Index Page (render all burgers to DOM)
  router.get('/index', function (req, res) {
    burger.selectAll(function(data) {
      var hbsObject = { burgers: data };
      //console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });
  
  
  // Create a New Burger
  router.post('/burger/create', function (req, res) {
    burger.insertOne(req.body.burger_name, function() {
      res.redirect('/index');
    });
  });
  
  
  // Devour a Burger
  router.post('/burger/eat/:id', function (req, res) {
    burger.updateOne(req.params.id, function() {
      res.redirect('/index');
    });
  });
  // ----------------------------------------------------
  
  
  // Export routes
  module.exports = router;