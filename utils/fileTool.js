var fs = require('fs');
var path = require('path');
function remove(filename) {
    try {
        var fileRealpath = path.resolve(`./public/images/${filename}`);
        fs.unlinkSync(fileRealpath);
    } catch (e) {
        console.error(e);
    }
}

module.exports = remove;
