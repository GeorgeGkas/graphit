/**
 * Configure web server (express.js).
 */

import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as morgan from 'morgan'
import * as path from 'path'
import config from '../config'
import routes from '../routes'
import logger from '../utils/logger'

/**
 * Start express server.
 */
export function listen(server: express.Express) {
  server.listen(config.server.port, () => {
    logger.debug('API service is running on local port ' + config.server.port)
  })
}

/**
 * Apply express middleware.
 */
export async function setup(server: express.Express) {
  const corsOption = {
    credentials: true,
    exposedHeaders: ['x-auth-token'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: true,
  }
  server.use(cors(corsOption))

  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))
  server.use(cookieParser(config.auth.cookieSecret))

  server.use(
    morgan('combined', {
      stream: {
        write: (msg: string) => logger.info(msg),
      },
    }),
  )

  server.use('/api/v1', routes)

  /**
   * Serve React app on production.
   */
  if (config.config_type ==='production') {
    server.use(express.static(path.join(__dirname, '..', '..', '..', 'frontend', 'build')));

    server.get('*', (_, res) => { 
      res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'index.html'))
    })
  }

  return server
}
