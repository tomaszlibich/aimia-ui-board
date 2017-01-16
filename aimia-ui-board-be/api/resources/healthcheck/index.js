'use strict';

const responder = require('../../common/responder'),
    moment = require('moment'),
    Instance = require(process.env.ROOT_PATH + '/models/instance');

module.exports = new class HealthcheckResource {

    get(request, response) {
        const instance = new Instance();

        responder.send(response, {
            status: 200,
            data: Object.assign({}, instance, {
                time: moment().format()
            })
        });
    }

};
