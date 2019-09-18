/**
 * Main routes entry.
 */

import * as express from 'express'
import auth from './auth'
import authors from './authors'
import projects from './projects'

const router = express.Router()

router.use('/auth', auth)
router.use('/projects', projects)
router.use('/authors', authors)

export default router
