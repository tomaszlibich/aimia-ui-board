'use strict';

const fs = require('fs-extra'),
    os = require('os'),
    PACKAGE_JSON = require(process.env.ROOT_PATH + '/package.json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

if (fs.existsSync('.env.json')) {//eslint-disable-line no-sync
    require('dot-env');
}

module.exports = {
    APP: PACKAGE_JSON.name,
    APP_PATH: process.cwd(),
    DESCRIPTION: PACKAGE_JSON.description,
    URL: process.env.URL || '127.0.0.1',
    PORT: process.env.PORT || 5000,
    PR_ALERT_REPEAT_DELAY: 3600000,
    SOUNDS_PATH: process.env.ROOT_PATH + '/sounds/'
};
