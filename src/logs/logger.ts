import winston from 'winston';

import { SERVICE_NAME } from '../configs';

const customFormat = winston.format((info) => {
  return Object.assign(info.timestamp, info);
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat(),
    winston.format.json()
  ),
  defaultMeta: {
    service: SERVICE_NAME
  },
  transports: [
    new (winston.transports.Console)({
      level: 'info'
    })
  ]
});
