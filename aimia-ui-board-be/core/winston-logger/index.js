'use strict';

const fs = require('fs'),
    moment = require('moment'),
    winston = require('winston'),
    CONFIG = require(process.env.ROOT_PATH + '/core/config'),
    logsDirectory = process.env.ROOT_PATH + '/logs';

if (!fs.existsSync(logsDirectory)) {//eslint-disable-line no-sync
    fs.mkdirSync(logsDirectory);//eslint-disable-line no-sync
}

module.exports = {
    logger: new (winston.Logger)({
        exitOnError: false, //don't crash on exception
        transports: [
            new (winston.transports.Console)({
                level: 'debug',
                prettyPrint: true,
                silent: false,
                timestamp: moment().utc().format('YYYY-MM-DDTHH:mm:ss:S'),
                colorize: true,
                json: false,
                formatter: options => {
                    return '[' + winston.config.colorize(options.level, options.level.toUpperCase()) + '] ' + options.timestamp + '\n' + (undefined !== options.message ? options.message : '') + '\n';
                }
            }), //always use the console
            new (winston.transports.File)({
                name: 'file.all',
                maxsize: 10485760,
                filename: logsDirectory + '/' + CONFIG.APP.toLowerCase() + '-server.log' //log everything to the server.log
            }),
            new (winston.transports.File)({
                name: 'file.error',
                maxsize: 10485760,
                level: 'error',
                filename: logsDirectory + '/' + CONFIG.APP.toLowerCase() + '-error.log', //log errors and exceptions to the error.log
                handleExceptions: true
            }),
            new (winston.transports.File)({
                name: 'file.warn',
                maxsize: 10485760,
                level: 'warn',
                filename: logsDirectory + '/' + CONFIG.APP.toLowerCase() + '-warn.log' //log warn to the warn.log
            }),
            new (winston.transports.File)({
                name: 'file.info',
                level: 'info',
                filename: logsDirectory + '/' + CONFIG.APP.toLowerCase() + '-info.log' //log info to the info.log
            })
        ]
    })
};

