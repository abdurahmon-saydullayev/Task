const Config = require("../config/index");
const Logger = require("../config/logger");

const CatchWrapDb = (namespace, fn) => {
    return async (arg) => {
        Logger.debug(`${namespace}: requested`);
        try {
            let resp = await fn(arg);
            Logger.debug(`${namespace}: succeeded`);
            return resp;
        } catch (error) {
            console.log(`environment`, Config.environment);
            if (Config.environment == "debug") {
                Logger.error(`${namespace} failed: ${error}`);
            }
            throw new Error(error.message);
        }
    };
};

module.exports = CatchWrapDb;
