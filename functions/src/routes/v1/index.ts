import * as express from 'express'
import projects from './projects'

const router = express.Router()

router.use('/projects', projects)

export default router
