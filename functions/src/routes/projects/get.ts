import * as express from 'express'
import * as firebase from 'firebase-admin'

export default async function get(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const documentId = req.params.id

  try {
    const { docs } = await req.app
      .get('db')
      .collection('projects')
      .where(firebase.firestore.FieldPath.documentId(), '==', documentId)
      .limit(1)
      .get()
    const doc = docs.pop()

    if (!doc!.exists) {
      return res.status(404).send({ message: `Could not get project.` })
    }

    const project = doc!.data()
    return res.status(200).json({ data: project })
  } catch (e) {
    return res.status(500).send({ message: `Could not get project.` })
  }
}
