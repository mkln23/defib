import pino from 'pino';

const loggerConfig: pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
};

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
    loggerConfig.transport = {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelFirst: true,
            singleLine: true,
            ignore: 'pid,hostname,reqId,context,awsRequestId',
            messageFormat: '{msg}',
        },
    };
}

const logger = pino(loggerConfig);

export default logger;
