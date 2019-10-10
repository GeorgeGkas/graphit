import * as express from 'express'
import get from './get'

const router = express.Router()

/**
 * Get authenticated user profile.
 */
router.route('/').get(get)

export default router
