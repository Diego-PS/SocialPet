import { Post } from '../../entities/Post'
import { IPost } from '../../interfaces/IPost'

export interface IPostWithUrl extends Omit<IPost, 'id' | 'petId'> {
    mediaUrl?: string
}

export const getPostsWithUrl = async (posts: Post[]) => 
{
    const postsWithUrl: IPostWithUrl[] = []
    for (const post of posts) {
        const { url } = await post.download()
        postsWithUrl.push({ 
            ...post,
            mediaUrl: url
        })
    }
    return postsWithUrl
}