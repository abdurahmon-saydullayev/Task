const grpc = require("@grpc/grpc-js");
const Logger = require("../config/logger");

const CatchWrapService = (namespace, fn) => {
    return async (call, callback) => {
        Logger.info(
            `${namespace}: requested - ${JSON.stringify(call.request)}`
        );
        try {
            const resp = await fn(call.request);
            Logger.info(`${namespace}: succeeded`);
            callback(null, resp);
        } catch (error) {
            Logger.error(`${namespace}: failed with error: ${error.message}`);
            callback({
                code: grpc.status.INTERNAL,
                message: error.message
            });
        }
    };
};

module.exports = CatchWrapService;
