var express = require('express'); //引入express模組
var router = express.Router();
var upload = require('../middleware/upload');
var isAuthenticated = require('../middleware/auth');
var remove = require('../utils/fileTool');

var Model = require('../models/carouselModel'); //引入carouselModel

router.get('/', function (req, res) {  //定義取得輪播圖API的路由方法為GET
    Model.find(function (err, data) {  //使用find()方法找到資料庫中傳播圖的資料
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
        image: '/' + req.file.filename,
        title: req.body.title,
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

module.exports = router; //將router以模組的方式導出