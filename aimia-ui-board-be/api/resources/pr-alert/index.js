'use strict';

const moment = require('moment'),
    rootPath = process.env.ROOT_PATH,
    CONFIG = require(rootPath + '/core/config'),
    player = require(rootPath + '/features/player'),
    responder = require('../../common/responder');

module.exports = new class HealthcheckResource {

    constructor() {
        this.history = {
            alert: [],
            warning: []
        };

        this.soundsToPlay = [];
        this.playingSounds = false;

        setInterval(() => {
            this.history.alert = [];
        }, CONFIG.PR_ALERT_REPEAT_DELAY);
    }

    playSounds(self) {
        self.playingSounds = true;
        if (self.soundsToPlay.length) {
            player.play(self.soundsToPlay[0], () => {
                self.playSounds(self);
                self.playingSounds = false;
            });
            self.soundsToPlay.shift();
        }
    }

    post(request, response) {
        const json = request.body.json,
            data = JSON.parse(JSON.parse(json).json),
            id = data.id,
            type = data.type;

        if (type && id && id !== 'pending') {
            if (this.history[type].indexOf(id) === -1) {
                console.log('[api/resources/pr-alert] Raising', type, 'for', id);
                this.history[type].push(id);
                this.soundsToPlay.push(type);
                if (!this.playingSounds) {
                    this.playSounds(this);
                }
            }
        }

        responder.send(response, {
            status: 200
        });
    }

};