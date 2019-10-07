import { setup as setupDB } from './setup/db'
import { connect, register, setup as setupServer } from './setup/server'

/**
 * Initialize connection to Admin SDK and
 * return a Firestore instance.
 */
const db = setupDB()

/**
 * Create Express server to serve all routes.
 */
const server = setupServer()

/**
 * Add Firestore to Express.
 * Allow for use directly from express.Request object .
 */
connect(
  db,
  server,
)

/**
 * Register the Express server as firebase function.
 */
const api = register(server)

export { api }
