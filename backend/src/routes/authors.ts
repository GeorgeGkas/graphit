import * as express from 'express'
import Author from '../models/author'
import { verify as verifyToken } from '../utils/token'

const router = express.Router()

/**
 * Get all projects by a user.
 */
router
  .route('/:id/projects')
  .get(
    // @ts-ignore for smooth usage with AugmentedRequest interface.
    verifyToken,
    async (req: express.AugmentedRequest, res: express.Response) => {
      try {
        const authorId = req.authToken.id

        /**
         * Only allow an author to get his own project list.
         */
        if (req.params.id !== authorId) {
          res.sendStatus(401)
          return
        }

        const project = await Author.getProjects(authorId)

        if (!project) {
          /**
           * Author has not created any project yet.
           */
          res.status(200).send([])
        } else {
          res.status(200).send(project.projects)
        }
      } catch (err) {
        res.sendStatus(500)
      }
    },
  )

export default router
