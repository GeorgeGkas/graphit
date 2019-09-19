/**
 * Create a global logger using winston module.
 * The logger will be installed as express middleware
 * through morgan to track the requests and internally
 * by the various parts of the app to log info and errors.
 */

import * as winston from 'winston'

function formatParams(info: any) {
  const { timestamp, level, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace('T', ' ')

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args) : ''
  }`
}

const developmentFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(formatParams),
)

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(formatParams),
)

let logger: winston.Logger

if (process.env.NODE_ENV !== 'production') {
  logger = winston.createLogger({
    format: developmentFormat,
    level: 'silly',
    transports: [new winston.transports.Console()],
  })
} else {
  logger = winston.createLogger({
    format: productionFormat,
    level: 'silly',
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'silly',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  })
}

export default logger
