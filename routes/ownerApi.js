var express = require('express');
var router = express.Router();
var upload = require('../middleware/upload');
var isAuthenticated = require('../middleware/auth');
var remove = require('../utils/fileTool');

var Model = require('../models/ownerModel');

router.get('/', function (req, res) {
    Model.findOne(function (err, data) {
        if (err) {
            res.json({
                "status": 1
            });
        } else {
            res.json({
                "status": 0,
                "data": data
            });
        }
    });
});

router.patch('/', isAuthenticated, upload.single('file'), function (req, res) {
    Model.findOne(function (err, data) {
        if (err) {
            res.json({
                "status": 1
            });
        } else {
            if (req.file) {
                remove(data.image);
                data.image = '/' + req.file.filename;
            }
            data.name = req.body.name;
            data.job = req.body.job;
            data.phone = req.body.phone;
            data.email = req.body.email;
            data.save(function (err) {
                if (err) {
                    res.json({
                        "status": 1
                    });
                } else {
                    res.json({
                        "status": 0
                    });
                }
            });
        }
    });
});

module.exports = router;