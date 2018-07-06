import winston from 'winston';
import path from 'path';

const fileConfig = {
  handleExceptions: true,
  json: false,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
};

const logger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new winston.transports.File(Object.assign({
      filename: path.join(__dirname, '../logs/combined.log'),
      level: 'info',
    }, fileConfig)),
    new winston.transports.File(Object.assign({
      filename: path.join(__dirname, '../logs/errors.log'),
      level: 'error',
    }, fileConfig)),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
  ],
});

logger.stream = {
  write(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;
