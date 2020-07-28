var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/website', { useNewUrlParser: true });
mongoose.connection.once('connected', () => {
    mongoose.connection.db.dropDatabase();
});

fs.readdirSync(path.resolve(__dirname, 'seeds'))
    .map(value => { return String(value).replace('.js', '') })
    .forEach(key => {
        console.info(key);
        require(`./seeds/${key}`).forEach((data, index, arr) => {
            new require(`../models/${key}`)(data).save(err => {
                if (err) {
                    console.error(err);
                } else if (index === arr.length - 1) {
                    mongoose.connection.close();
                }
            });
        });
    });
