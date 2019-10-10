import * as express from 'express'
import * as admin from 'firebase-admin'

export default async function verify(
  req: express.AugmentedRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const sessionCookie = req.cookies.session

    if (!sessionCookie) {
      throw new Error('Unauthorized')
    }

    const decodedIdToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true)

    req.author = decodedIdToken
    return next()
  } catch (e) {
    res.clearCookie('session', {
      httpOnly: true,
      secure: false,
    })

    return res.sendStatus(401)
  }
}
