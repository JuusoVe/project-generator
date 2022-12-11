import { Router } from "express";
import repos from './repos'

const router = Router()

router.use(repos)

export default router
