'use strict';

const CONFIG = require(process.env.ROOT_PATH + '/core/config'),
    player = require('play-sound')({});

module.exports = new class Player {

    play(filename, callback) {
        console.log('[features/player] Playing:', filename, '...');

        player.play(CONFIG.SOUNDS_PATH + filename + '.mp3', (error) => {
            if (error) {
                console.log('[features/player] Player error', error);
            } else {
                console.log('[features/player] Playing', filename, 'finished...');

                if (callback) {
                    callback();
                }
            }
        });
    }

};