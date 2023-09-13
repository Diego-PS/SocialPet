import { repositories } from '../database/repositories'
import { PostServices } from './PostServices'

export const services = {
    post: new PostServices(repositories.post)
}