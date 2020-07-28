var express = require('express');
var router = express.Router();
var Model = require('../models/userModel');

router.post('/login', function (req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password,
    };
    Model.findOne(user, function (err, data) {
        if (err) {
            res.json({ "status": 1, "msg": err });
        } else if (data == null) {
            res.json({ "status": 1, "msg": "使用者名稱密碼錯誤" });
        } else {
            req.session.auth = data._id;
            res.json({ "status": 0,  "data": data });
        }
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.json({ "status": 1 });
        } else {
            res.json({ "status": 0 });
        }
    });
});

module.exports = router;
