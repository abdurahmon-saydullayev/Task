const winston = require("winston");
const Config = require("./index");

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};

const Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({
            label: Config.serviceName,
        }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"]
        }),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({
            filename: "logs/debug.log",
            level: "debug"
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        })
    ]
});

if (Config.environment == "debug") {
    const consoleLogFormat = winston.format.printf(
        (info) =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
    );
    Logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                consoleLogFormat
            ),
            level: "debug"
        })
    );
}

module.exports = Logger;
