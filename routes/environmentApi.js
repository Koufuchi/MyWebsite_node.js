var express = require('express');
var router = express.Router();
var upload = require('../middleware/upload');
var isAuthenticated = require('../middleware/auth');
var Model = require('../models/environmentModel');
var remove = require('../utils/fileTool');

router.get('/', function (req, res) {
    Model.find(function (err, data) {
        if (err) {
            res.json({ "status": 1 });
        } else {
            res.json({ "status": 0, "data": data });
        }
    });
});

router.put('/', isAuthenticated, upload.single('file'), function (req, res) {
    var model = new Model({
        image: '/' + req.file.filename,
        title: req.body.title,
    });
    model.save(function (err, data) {
        if (err) {
            res.json({ "status": 1 });
        } else {
            res.json({ "status": 0 });
        }
    });
});

router.patch('/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    var update = {
        title: req.body.title
    };
    Model.findByIdAndUpdate(id, update, function (err, data) {
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

router.delete('/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    Model.findByIdAndRemove(id, function (err, data) {
        if (err) {
            res.json({ "status": 1 });
        } else {
            remove(data.image);
            res.json({ "status": 0 });
        }
    });
});

module.exports = router;