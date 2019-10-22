import * as express from 'express'
import * as admin from 'firebase-admin'
import logger from '../../utils/logger'

export default async function signout(
  req: express.Request,
  res: express.Response,
) {
  res.clearCookie('session', {
    httpOnly: true,
    secure: false,
  })

  try {
    const sessionCookie = req.cookies.session

    if (!sessionCookie) {
      return res.sendStatus(204)
    }

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie)
    await admin.auth().revokeRefreshTokens(decodedClaims.sub)

    return res.sendStatus(204)
  } catch (e) {
    logger.error(e)
    return res.sendStatus(204)
  }
}
