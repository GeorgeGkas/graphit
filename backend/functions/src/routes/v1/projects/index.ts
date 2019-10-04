import * as express from 'express'
import * as firebase from 'firebase-admin'
import { invokeMap, map, merge, pick, values } from 'lodash/fp'

const router = express.Router()

/**
 * Get all projects from an author.
 */
router.route('/').get(async (req: express.AugmentedRequest, res) => {
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
})

/**
 * Create a new project.
 */
router.route('/').post(async (req: express.AugmentedRequest, res) => {
  const project = req.body

  try {
    const docRef = await req.app
      .get('db')
      .collection('projects')
      .add(project)
    return res.status(201).json({ data: docRef.id })
  } catch (e) {
    return res.status(500).send({ message: `Could not create project.` })
  }
})

/**
 * Read a project.
 */
router.route('/:id').get(async (req: express.AugmentedRequest, res) => {
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
})

/**
 * Update a project.
 */
router.route('/:id').patch(async (req: express.AugmentedRequest, res) => {
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
})

/**
 * Delete a project.
 */
router.route('/:id').delete(async (req: express.AugmentedRequest, res) => {
  const documentId = req.params.id

  try {
    const docRef = req.app
      .get('db')
      .collection('projects')
      .doc(documentId)

    if (!(await docRef.get()).exists) {
      return res.status(404).send({ message: `Could not find project.` })
    }

    await docRef.delete()
    return res.sendStatus(204)
  } catch (e) {
    return res.status(500).send({ message: `Could not delete project.` })
  }
})

export default router
