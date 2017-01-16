'use strict';

const bodyParser = require('body-parser'),
    cors = require('./cors'),
    handlerFor404 = require('./404');

function configure(app) {
    app.use(cors);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
}

module.exports = {
    configure,
    handlerFor404
};
