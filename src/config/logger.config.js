const winston = require('winston');
const { LOG_DB_URL } = require('./server.config');
const allowedTransports = [];
require('winston-mongodb');

// The Below Transport configuration enables logging on the console
allowedTransports.push(new winston.transports.Console({
    format : winston.format.combine(
        winston.format.colorize(),
        // how we want timestamp to come up
        winston.format.timestamp({
            format : 'YYYY-MM-DD HH:mm:ss'
        }),
        // what exactly going to be printed in log
        winston.format.printf((log) => `${log.timestamp} [${log.level}] : ${log.message}`),
        
    )
}));

// The Below Transport configuration enables logging on the mongodb database
allowedTransports.push(new winston.transports.MongoDB({
    level : 'error',
    db : LOG_DB_URL,
    collection : "logs",

}));

allowedTransports.push(new winston.transports.File({
    filename: `app.log`
}))

const logger = winston.createLogger({
    format : winston.format.combine(
        // how we want timestamp to come up
        winston.format.timestamp({
            format : 'YYYY-MM-DD HH:mm:ss'
        }),
        // what exactly going to be printed in log
        winston.format.printf((log) => `${log.timestamp} [${log.level.toUpperCase()}] : ${log.message}`)
    ),
    transports : allowedTransports
})

module.exports = logger;

