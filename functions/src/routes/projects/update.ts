import * as express from 'express'

export default async function update(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const documentId = req.params.id
  const newDocument = req.body

  try {
    const docRef = req.app
      .get('db')
      .collection('projects')
      .doc(documentId)

    if (!(await docRef.get()).exists) {
      return res.status(404).send({ message: `Could not find project.` })
    }

    await docRef.update(newDocument)
    return res.sendStatus(204)
  } catch (e) {
    return res.status(500).send({ message: `Could not update project.` })
  }
}
