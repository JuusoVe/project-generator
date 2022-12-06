import { Octokit } from "@octokit/rest";

const ghAPIClient = new Octokit({
    auth: process.env.GITHUB_ACCESS_KEY,
    userAgent: 'coreGenerator'
})

const listUserRepos = async () => await ghAPIClient.repos.listForUser({ username: "JuusoVe" })

export default {
    listUserRepos
}