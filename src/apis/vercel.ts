import axios from 'axios'
import { REQUIRED_ENVS } from '..'

const VERCEL_BASE_URL = 'https://api.vercel.com'
const VERCEL_PROJECTS_PATH = '/v9/projects'

const client = axios.create({
    baseURL: VERCEL_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env[REQUIRED_ENVS.userVercelToken]}`,
    },
})

const createProject = async (projectName: string) => {
    const createVercelProjectResponse = await client.post(
        VERCEL_PROJECTS_PATH,
        { name: projectName }
    )
    return createVercelProjectResponse
}

const deleteProject = async (projectName: string) => {
    const deleteVercelProjectResponse = await client.delete(
        VERCEL_PROJECTS_PATH + '/' + projectName
    )
    return deleteVercelProjectResponse
}

export default {
    createProject,
    deleteProject,
}
