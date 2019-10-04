import * as express from 'express'
import { validateUserAuth } from './auth'
import v1 from './v1'

const router = express.Router()

router.use('/v1', validateUserAuth, v1)

export default router
