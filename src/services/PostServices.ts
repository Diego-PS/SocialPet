import { db } from '../database/Database'
import { IRepository } from '../database/repositories/interfaces/IRepository'
import { IPost } from '../interfaces/IPost'

export class PostServices
{
    constructor(public repository: IRepository<IPost>) {}

    async create(post: IPost) 
    {
        if (!post.textContent && !post.mediaFileId) 
            throw new Error('You cannot create a post with no content')

        if (post.mediaFileId) db.buckets.media.uploadFile(post.mediaFileId)
        
        await this.repository.create(post)
    }

    async getAll()
    {
        await this.repository.get()
    }

    async deleteById(id: string) 
    {
        await this.repository.delete({ id })
    }
}