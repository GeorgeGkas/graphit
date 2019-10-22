import * as express from 'express'
import * as firebase from 'firebase-admin'
import logger from '../../utils/logger'

export default async function get(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const documentId = req.params.id
  const author = req.author!

  try {
    const { docs } = await req.app
      .get('db')
      .collection('projects')
      .where(firebase.firestore.FieldPath.documentId(), '==', documentId)
      .where('author', '==', author.uid)
      .limit(1)
      .get()
    const doc = docs.pop()

    if (!doc!.exists) {
      return res.status(404).send({ message: `Could not get project.` })
    }

    const project = doc!.data()
    return res.status(200).json({ data: project })
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ message: `Could not get project.` })
  }
}
