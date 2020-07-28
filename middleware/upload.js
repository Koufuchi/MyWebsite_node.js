var multer = require('multer');

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images');
        },
        filename: function (req, file, cb) {
            var str = file.originalname.split('.');
            cb(null, Date.now() + '.' + str[1]);
        }
    })
});
module.exports = upload;
