import * as express from 'express'
import create from './create'
import get from './get'
import getAll from './getAll'
import remove from './remove'
import update from './update'

const router = express.Router()

/**
 * Get all projects from an author.
 */
router.route('/').get(getAll)

/**
 * Create a new project.
 */
router.route('/').post(create)

/**
 * Read a project.
 */
router.route('/:id').get(get)

/**
 * Update a project.
 */
router.route('/:id').patch(update)

/**
 * Delete a project.
 */
router.route('/:id').delete(remove)

export default router
