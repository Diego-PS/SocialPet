import { createPost } from './createPost'
import { deletePost } from './deletePost'
import { getAllPosts } from './getAllPosts'

export class PostController
{
    createPost = createPost
    deletePost = deletePost
    getAllPosts = getAllPosts
}
