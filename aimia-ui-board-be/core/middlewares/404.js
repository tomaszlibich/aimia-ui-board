const CONFIG = require('../config');

module.exports = (request, response, next) => {
    response.send(CONFIG.APP);
    next();
};
