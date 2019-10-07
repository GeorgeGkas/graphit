import * as express from 'express'
import * as admin from 'firebase-admin'

declare module 'express' {
  /**
   * Extend the original express.Request interface,
   * by including variables and settings originated
   * in various middleware.
   */
  interface AugmentedRequest extends express.Request {
    /**
     * In routes where the author was authenticated beforehand,
     * the request object is extending with the author's info.
     */
    author?: admin.auth.DecodedIdToken

    /**
     * To avoid requiring firestore module in each file,
     * we register the firestore instance to application
     * settings that can be retrieved in request object.
     */
    app: express.Application & {
      get(value: 'db'): admin.firestore.Firestore
    }
  }
}
