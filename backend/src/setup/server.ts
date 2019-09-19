/**
 * Configure web server (express.js).
 */

import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as morgan from 'morgan'
import * as path from 'path'
import routes from '../routes'
import logger from '../utils/logger'

/**
 * Start express server.
 */
export function listen(server: express.Express) {
  server.listen(process.env.SERVER_PORT, () => {
    logger.debug('API service is running on local port ' + process.env.SERVER_PORT)
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
  server.use(cookieParser(process.env.COOKIE_SECRET))

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
  if (process.env.NODE_ENV ==='production') {
    server.use(express.static(path.join(__dirname, '..', '..', '..', 'frontend', 'build')));

    server.get('*', (_, res) => { 
      res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'index.html'))
    })
  }

  return server
}
