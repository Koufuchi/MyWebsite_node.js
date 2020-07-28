/*
取得團隊成員的後端API，使用find()方法取得團隊成員資料，app.js
*/
var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/auth');
var Model = require('../models/teamModel');
var upload = require('../middleware/upload');
var remove = require('../utils/fileTool');

router.get('/', function (req, res) {
    Model.find(function (err, data) {
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

router.put('/', isAuthenticated, upload.single('file'), function (req, res) {
    var model = new Model({
        avatar: '/' + req.file.filename,
        name: req.body.name,
    });
    model.save(function (err, data) {
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
});

router.patch('/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    var update = {
        name: req.body.name,
    };
    Model.findByIdAndUpdate(id, update, function (err, data) {
        if (err) {
            res.json({
                "status": 1
            });
        } else {
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

router.delete('/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    Model.findByIdAndRemove(id, function (err, data) {
        if (err) {
            res.json({
                "status": 1
            });
        } else {
            remove(data.avatar);
            res.json({
                "status": 0
            });
        }
    });
});

module.exports = router;