import * as express from 'express'
import { invokeMap, map, merge, orderBy, pick, values } from 'lodash/fp'
import logger from '../../utils/logger'

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
      .get()

    const ids = map(pick(['id']))(docs)

    const projects = map(pick(['algorithm', 'createdAt', 'name']))(
      map(
        (data: { author: string; graph: string }) =>
          JSON.parse(data.graph).metadata,
      )(invokeMap('data', docs)),
    )

    const result = orderBy(
      ['createdAt'],
      ['desc'],
      values(merge(ids, projects)),
    )

    return res.status(200).json({ data: result })
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ message: `Could not get project list.` })
  }
}
