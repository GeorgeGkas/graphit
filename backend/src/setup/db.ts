/**
 * Configure database (MongoDB).
 */

import * as mongoose from 'mongoose'
import logger from '../utils/logger'

export function setup() {
  const options = { keepAlive: true, useNewUrlParser: true }
  mongoose.connect(process.env.MONGO_URI as string, options).catch(logger.error)

  logger.debug('connection to database was successfully established')

  return mongoose.connection
}
