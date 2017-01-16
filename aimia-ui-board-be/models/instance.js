const CONFIG = require(process.env.ROOT_PATH + '/core/config');

module.exports = class {
    constructor(name, role, url, port) {
        this.name = name || CONFIG.APP;
        this.url = url || CONFIG.URL;
        this.port = port || CONFIG.PORT;
    }
};
