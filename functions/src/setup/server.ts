import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import { firestore } from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import routes from '../routes'
import logger from '../utils/logger'

export function setup() {
  const server = express()

  /**
   * Protect from well-known vulnerabilities.
   */
  server.use(helmet())
  server.use(helmet.hidePoweredBy({ setTo: 'Sanctum Sanctorum' }))

  /**
   * Set up CORS.
   */
  const corsOption = {
    credentials: true,
    origin: true,
  }
  server.use(cors(corsOption))

  /**
   * Handle session cookies.
   */
  server.use(cookieParser())

  /**
   * Handle JSON payload on requests.
   */
  server.use(express.json())
  server.use(express.urlencoded({ extended: false }))

  /**
   * Log request activity.
   */
  server.use(
    morgan('combined', {
      stream: {
        write: (msg: string) => logger.info(msg),
      },
    }),
  )

  /**
   * Register routes.
   */
  server.use('/', routes)

  return server
}

export function connect(db: firestore.Firestore, server: express.Express) {
  server.set('db', db)
}

export function register(server: express.Express) {
  return functions.region('europe-west1').https.onRequest(server)
}
