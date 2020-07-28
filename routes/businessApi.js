var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/auth');

var Model = require('../models/businessModel');

router.get('/', function (req, res) {
    Model.find(function (err, data) {
        if (err) {
            res.json({ "status": 1 });
        } else {
            res.json({ "status": 0,  "data": data });
        }
    });
});

router.patch('/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    var update = {
        name: req.body.name,
        content: req.body.content,
    };
    Model.findByIdAndUpdate(id, update, function (err, data) {
        if (err) {
            res.json({ status: false, error: err });
        } else {
            data.save(function (err) {
                if (err) {
                    res.json({ status: false, error: err });
                }
                else {
                    res.json({ status: true });
                }
            });
        }
    });
});

module.exports = router;