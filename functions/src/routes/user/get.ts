import * as express from 'express'
import * as firebase from 'firebase-admin'

export default async function get(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  try {
    const user = await firebase.auth().getUser(req.author!.uid)

    if (!user) {
      throw new Error()
    }

    const profile = {
      email: user.email,
      imageUrl: user.photoURL,
      name: user.displayName,
      uid: user.uid,
    }

    return res.status(200).json({ data: profile })
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Could not get authenticated user profile.` })
  }
}
