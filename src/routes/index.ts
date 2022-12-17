import { Router } from 'express'
import repos from './repos'
import frontends from './frontends'

const router = Router()

router.use(repos)
router.use(frontends)

export default router
