'use strict';

const winston = require(process.env.ROOT_PATH + '/core/winston-logger');

class Responder {

    constructor() {
        this.badRequestParams = {
            'status': 400,
            'error': 'Bad request',
            'type': 'text/plain'
        };

        this.badGatewayParams = {
            status: 502,
            error: 'bad gateway'
        };

        this.unauthorizedRequestParams = {
            'status': 401,
            'error': 'Unauthorized',
            'type': 'text/plain'
        };

        this.notFoundParams = {
            status: 404,
            error: 'not found'
        };
    }

    send(response, params) {
        if (response) {
            if (params.status >= 200 && params.status < 300) {
                response.json(params.data || {});
            } else {
                winston.logger.error('Request error:', params.status);
                response.writeHead(params.status, {
                    'Content-Type': 'text/plain'
                });
                response.end((params.error || 'unknown'));
            }
        }
    }

    reject(response) {
        this.send(response, this.badRequestParams);
    }

    rejectNotFound(response) {
        this.send(response, this.notFoundParams);
    }

    rejectBadGateway(response) {
        this.send(response, this.badGatewayParams);
    }

    rejectUnauthorized(response) {
        this.send(response, this.unauthorizedRequestParams);
    }

}

module.exports = new Responder();
