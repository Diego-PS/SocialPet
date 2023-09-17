import { config } from '../config'
import { db } from '../database/Database'
import { repositories } from '../database/repositories'
import { Post } from '../entities/Post'
import { IPost } from '../interfaces/IPost'

export class PostServices
{
    async create(params: IPost) 
    {
        if (!params.textContent && !params.mediaFileId) 
            throw new Error('You cannot create a post with no content')

        if (params.mediaFileId) db.buckets.media.uploadFile(params.mediaFileId)
        
        const postInterface = await repositories.post.create(params)
        const post = new Post(postInterface)
        return post
    }

    async download(id: string)
    {
        const post = await repositories.post.getById(id)
        if (post.mediaFileId) db.buckets.media.downloadFile(post.mediaFileId, config.DOWNLOADS_PATH)
    }

    async getAll()
    {
        const postInterfaces = await repositories.post.get()
        const posts = postInterfaces.map(postInterface => new Post(postInterface))
        return posts
    }

    async getById(id: string)
    {
        const postInterface = await repositories.post.getById(id)
        const post = new Post(postInterface)
        return post
    }

    async deleteById(id: string) 
    {
        const post = await repositories.post.getById(id)
        if (post.mediaFileId) await db.buckets.media.deleteFile(post.mediaFileId)
        await repositories.post.delete({ id })
    }
}