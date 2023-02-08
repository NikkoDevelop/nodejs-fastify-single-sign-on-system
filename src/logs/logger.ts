import winston from 'winston';
import { SERVER_SERVICE_NAME } from '../configs/config';

const customFormat = winston.format((info, opts) => {
  const res: any = {};

  res.timestamp = info.timestamp;
  Object.assign(res, info);

  return res;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat(),
    winston.format.json(),
  ),
  defaultMeta: {
    service: SERVER_SERVICE_NAME,
  },
  transports: [
    new (winston.transports.Console)({
      level: 'info',
    }),
  ],
});
