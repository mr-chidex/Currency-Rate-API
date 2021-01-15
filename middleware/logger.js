const { createLogger, format, transports, info } = require("winston");

const logger = createLogger({
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: "info.log",
            level: "info",
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: "error.log",
            level: "error",
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;