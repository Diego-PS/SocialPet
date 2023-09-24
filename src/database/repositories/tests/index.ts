import { Describe } from '../../../abstractions/Test/Describe'
import { postRepositoryTets } from '../implementations/PostRepository/tests'

const describes =
[
    postRepositoryTets
]

export const repositoriesTests = new Describe('Repositories', describes)