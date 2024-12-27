const winston = require('winston');
const { LOG_DB_URL } = require('./server.config');
require('winston-mongodb');
const {Writable} = require('stream');
const {logToCosmosDB} = require('../clientapis/cosmosClient');

const allowedTransports = [];

const customTransport = new Writable({
    write(chunk, encoding, callback) {
        const message = chunk.toString();
        console.log("Log intercepted in custom transport ",message);
        logToCosmosDB("error",message);
        callback();
    }
})

const customStreamTransport = new winston.transports.Stream({
    stream:customTransport
});

allowedTransports.push(customStreamTransport);

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

