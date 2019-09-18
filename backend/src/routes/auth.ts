/**
 * Authentication endpoints.
 */

import * as express from 'express'
import * as passport from 'passport'
import registerGoogleAuth from '../auth/google'
import {
  send as sendToken,
  setup as setupToken,
  verify as verifyToken,
} from '../utils/token'

const router = express.Router()

/**
 * Register Google OAuth 2.0 strategy.
 */
registerGoogleAuth()

/**
 * Authenticate using Google OAuth 2.0 services.
 */
router.route('/google').post(
  passport.authenticate('google-token', { session: false }),
  // @ts-ignore for smooth usage with AugmentedRequest interface.
  (
    req: express.AugmentedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    /**
     * User property is created by passport.js through Google OAuth
     * strategy. If the property is missing, not a valid access token
     * was supplied to authentication middleware.
     */
    if (!req.user) {
      return res.status(401).send('User Not Authenticated')
    }

    /**
     * Build a temporary `auth` object.
     * It will be replaced with `authUser` after the 
     * creation of JWT.
     */
    req.auth = {
      id: req.user.id,
    }

    return next()
  },
  /**
   * Setup JWT.
   */
  setupToken,

  /**
   * Send JWT to client.
   */
  sendToken,
)

/**
 * Verify JWT token.
 */
router
  .route('/token')
  // @ts-ignore for smooth usage with AugmentedRequest interface.
  .get(verifyToken, (_: express.AugmentedRequest, res: express.Response) => {
    res.sendStatus(200)
  })

/**
 * Delete JWT on logout.
 */
router.route('/logout').post((_, res) =>
  res
    .clearCookie('session', {
      httpOnly: true,
      path: '/',
      sameSite: true,
      signed: true,
    })
    .sendStatus(200),
)

export default router
