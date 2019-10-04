/**
 * Create a global logger using winston module.
 * The logger will be installed as express middleware
 * through morgan to track the requests and internally
 * by the various parts of the app to log info and errors.
 */

import { LoggingWinston } from '@google-cloud/logging-winston'
import * as winston from 'winston'

function formatParams(info: any) {
  const { timestamp, level, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace('T', ' ')

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args) : ''
  }`
}

const loggerFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(formatParams),
)

let logger: winston.Logger

logger = winston.createLogger({
  format: loggerFormat,
  level: 'silly',
  transports: [new winston.transports.Console(), new LoggingWinston()],
})

export default logger
