import * as express from 'express'
import { invokeMap, map, merge, pick, values } from 'lodash/fp'

export default async function getAll(
  req: express.AugmentedRequest,
  res: express.Response,
) {
  const author = req.author!

  try {
    const { docs } = await req.app
      .get('db')
      .collection('projects')
      .where('author', '==', author.uid)
      .orderBy('createdAt', 'desc')
      .get()
    const ids = map(pick(['id']))(docs)
    const projects = map(pick(['algorithm', 'createdAt', 'name']))(
      invokeMap('data', docs),
    )
    const result = values(merge(ids, projects))

    return res.status(200).json({ data: result })
  } catch (e) {
    return res.status(500).send({ message: `Could not get project list.` })
  }
}
