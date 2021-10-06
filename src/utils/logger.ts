import { createLogger, transports, format } from 'winston';
import { env } from '../constants';
import { ENodeEnv } from '../enum';

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      maxsize: 5242880,
      maxFiles: 5,
      level: 'info',
    }),
    new transports.File({
      filename: './logs/errors.log',
      maxsize: 5242880,
      maxFiles: 5,
      level: 'error',
    }),
  ],
});

if (env.NODE_ENV === ENodeEnv.dev) {
  logger.add(
    new transports.Console({
      level: 'debug',
    }),
  );
}

export default logger;
