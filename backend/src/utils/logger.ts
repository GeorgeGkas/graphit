/**
 * Create a global logger using winston module.
 * The logger will be installed as express middleware
 * through morgan to track the requests and internally
 * by the various parts of the app to log info and errors.
 */

import * as winston from 'winston'
import config from '../config'

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

if (config.config_type !== 'production') {
  logger = winston.createLogger({
    format: developmentFormat,
    level: config.debug_level,
    transports: [new winston.transports.Console()],
  })
} else {
  logger = winston.createLogger({
    format: productionFormat,
    level: config.debug_level,
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  })
}

export default logger
