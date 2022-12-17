import { Router } from 'express'
import vercelAPIClient from '../apis/vercel'

export const FRONTENDS_VERCEL_PROJECT_PATH = '/frontends/vercel/projects'

const router = Router()

router.post(FRONTENDS_VERCEL_PROJECT_PATH, async (req, res) => {
    const { projectName } = req.body
    await vercelAPIClient.createProject(projectName)
    res.json('OK.')
})

router.delete(FRONTENDS_VERCEL_PROJECT_PATH, async (req, res) => {
    const { projectName } = req.body
    await vercelAPIClient.deleteProject(projectName)
    res.json('OK.')
})

export default router
