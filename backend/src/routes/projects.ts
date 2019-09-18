import * as express from 'express'
import Project from '../models/project'
import { verify as verifyToken } from '../utils/token'

const router = express.Router()

/**
 * Create a new project.
 */
router
  .route('/')
  .post(
    // @ts-ignore for smooth usage with AugmentedRequest interface.
    verifyToken,
    async (req: express.AugmentedRequest, res: express.Response) => {
      /**
       * Project details.
       */
      const project = req.body
      
      const authorId = req.authToken.id

      try {
        /**
         * Create a new project and return its ID to client.
         */
        const { _id } = await Project.createProject(project, authorId)
        res.status(201).send(_id)
      } catch (err) {
        res.sendStatus(500)
      }
    },
  )

/**
 * Get a project.
 */
router
  .route('/:id')
  .get(
    // @ts-ignore for smooth usage with AugmentedRequest interface.
    verifyToken,
    async (req: express.AugmentedRequest, res: express.Response) => {
      const projectId = req.params.id
      const authorId = req.authToken.id

      try {
        const project = await Project.getProject(projectId)

        if (!project) {
          /**
           * Project does not exist.
           */
          res.sendStatus(404)
        } else if (project.authorId !== authorId) {
          /**
           * Only allow an author to get his own project.
           */
          res.sendStatus(401)
        } else {
          res.status(200).send(project.content)
        }
      } catch (err) {
        res.sendStatus(500)
      }
    },
  )

/**
 * Delete a project.
 */
router
  .route('/:id')
  .delete(
    // @ts-ignore for smooth usage with AugmentedRequest interface.
    verifyToken,
    async (req: express.AugmentedRequest, res: express.Response) => {
      const projectId = req.params.id
      const authorId = req.authToken.id

      try {
        const project = await Project.getProject(projectId)

        if (!project) {
          /**
           * Project does not exist.
           */
          res.sendStatus(404)
        } else if (project.authorId !== authorId) {
          /**
           * Only allow an author to delete his own project.
           */
          res.sendStatus(401)
        } else {
          await Project.deleteProject(projectId)
          res.sendStatus(200)
        }
      } catch (err) {
        res.sendStatus(500)
      }
    },
  )

/**
 * Update a project.
 */
router
  .route('/:id')
  .patch(
    // @ts-ignore for smooth usage with AugmentedRequest interface.
    verifyToken,
    async (req: express.AugmentedRequest, res: express.Response) => {
      const projectId = req.params.id
      const updateParams = req.body
      const authorId = req.authToken.id

      try {
        const project = await Project.getProject(projectId)

        if (!project) {
          /**
           * Project does not exist.
           */
          res.sendStatus(404)
        } else if (project.authorId !== authorId) {
          /**
           * Only allow an author to update his own project.
           */
          res.sendStatus(401)
        } else {
          await Project.updateProject(projectId, updateParams)
          res.sendStatus(200)
        }
      } catch (err) {
        res.sendStatus(500)
      }
    },
  )

export default router
