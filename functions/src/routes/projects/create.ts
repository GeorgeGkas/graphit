import * as express from 'express'
import logger from '../../utils/logger'

export default async function create(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const project = req.body

  try {
    const docRef = await req.app
      .get('db')
      .collection('projects')
      .add(project)
    return res.status(201).json({ data: docRef.id })
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ message: `Could not create project.` })
  }
}
