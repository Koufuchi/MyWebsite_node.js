var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/auth');
var Model = require('../models/userModel');

router.post('/', isAuthenticated, function (req, res) {
  Model.findOne(function (err, data) {
    if (err) {
      res.json({ "status": 1 });
    } else {
      res.json({ "status": 0,  "data": data });
    }
  });
});

router.patch('/', isAuthenticated, function (req, res) {
  var update = {
    password: req.body.password,
  };
  Model.findOneAndUpdate(null, update, function (err, data) {
    if (err) {
      res.json({ "status": 1 });
    } else {
      data.save(function (err) {
        if (err) {
          res.json({ "status": 1 });
        } else {
          res.json({ "status": 0 });
        }
      });
    }
  });
});

module.exports = router;