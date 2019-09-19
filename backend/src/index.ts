/**
 * Main app entry.
 * Configure database and start web server.
 */
import * as express from 'express'
import { setup as setupDB } from './setup/db'
import { listen as listenServer, setup as setupServer } from './setup/server'
import logger from './utils/logger'

setupDB()
  .on('error', logger.error)
  .on('disconnected', setupDB)
  .once('open', () => setupServer(express()).then(listenServer))
