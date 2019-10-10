import * as express from 'express'
import signin from './signin'
import signout from './signout'

const router = express.Router()

router.route('/signin').post(signin)
router.route('/signout').post(signout)

export default router
