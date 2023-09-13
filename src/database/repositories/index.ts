import { PostRepository } from './implementations/PostRepository'

export const repositories = {
    post: new PostRepository()
}