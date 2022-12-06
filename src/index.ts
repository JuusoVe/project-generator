import ghClient from './apis/github'

console.log('In index.ts');

const list = async () => {
    const res = await ghClient.listUserRepos()
    console.log(res);
}

list()
