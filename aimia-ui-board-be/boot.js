'use strict';

process.env.ROOT_PATH = process.cwd();

const app = require('express')(),
    CONFIG = require('./core/config'),
    middlewares = require('./core/middlewares'),
    Api = require('./api'),
    winston = require('./core/winston-logger');

app.listen(CONFIG.PORT, () => {
    winston.logger.info('[boot] Running server on port ' + CONFIG.PORT + '...');
});

middlewares.configure(app);

app.all('/api/:resource', Api.handle);
app.all('/api/:resource/:key', Api.handle);
app.use(middlewares.handlerFor404);
