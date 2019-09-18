/**
 * JWT operations.
 */

import { AugmentedRequest, NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config'

/**
 * Create and return a JWT using the id of the Google user.
 */
function create(auth: AugmentedRequest['auth']) {
  return jwt.sign({ id: auth.id }, config.auth.jwtSecret, {
    expiresIn: 60 * 120,
  })
}

/**
 * Express middleware for setting up a JWT.
 */
export function setup(req: AugmentedRequest, _: Response, next: NextFunction) {
  req.token = create(req.auth)
  return next()
}

/**
 * Verify a JWT.
 * Used as authentication middleware by many endpoints.
 */
export function verify(
  req: AugmentedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const decoded = jwt.verify(
      req.signedCookies.session,
      config.auth.jwtSecret,
    ) as AugmentedRequest['auth']
    req.authToken = decoded
    return next()
  } catch (err) {
    res.sendStatus(401)
  }
}

/**
 * Express middleware for sending the JWT to client
 */
export function send(req: AugmentedRequest, res: Response) {
  return res
    .status(200)
    .clearCookie('session', {
      httpOnly: true,
      path: '/',
      sameSite: true,
      signed: true,
    })
    .cookie('session', req.token, {
      expires: new Date(new Date().getTime() + 30 * 60 * 1000),
      httpOnly: true,
      path: '/',
      sameSite: true,
      signed: true,
    })
    .send(
      JSON.stringify({
        email: req.user._json.email,
        id: req.user._json.id,
        imageUrl: req.user._json.picture,
        name: req.user._json.name,
      }),
    )
}
