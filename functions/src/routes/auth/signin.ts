import * as express from 'express'
import * as admin from 'firebase-admin'

export default async function signin(
  req: express.Request,
  res: express.Response,
) {
  try {
    const token = req.body.token

    if (!token) {
      throw new Error('Unauthorized')
    }

    /**
     * Create a session cookie that expires in 4 hours.
     */
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(token, { expiresIn: 1000 * 60 * 60 * 4 })

    res.cookie('session', sessionCookie, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 4,
      secure: false,
    })

    return res.sendStatus(200)
  } catch (e) {
    return res.sendStatus(401)
  }
}
