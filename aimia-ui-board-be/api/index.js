'use strict';

const responder = require('./common/responder'),
    endpoints = [
        'healthcheck',
        'pr-alert'
    ],
    resources = {};

endpoints.map(endpoint => {
    resources[endpoint] = require('./resources/' + endpoint);
});

class Api {
    handle(request, response) {
        const resource = request.params ? request.params.resource : undefined,
            isApiRoute = request.url.indexOf('/api/') !== -1,
            requestMethod = request.method.toLowerCase();

        if (isApiRoute && resource) {
            if (resources[resource] && resources[resource][requestMethod]) {
                resources[resource][requestMethod](request, response);
            } else {
                responder.reject(response);
            }
        } else {
            responder.reject(response);
        }
    }
}

module.exports = new Api();
