import * as express from 'express'
import auth from './auth'
import verifySessionCookie from './auth/verify'
import projects from './projects'
import user from './user'

const router = express.Router()

router.use('/auth', auth)
router.use('/projects', verifySessionCookie, projects)
router.use('/user', verifySessionCookie, user)

export default router
