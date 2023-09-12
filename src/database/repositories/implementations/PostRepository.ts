import { IPost } from '../../../entities/Post'
import { PostDB } from '../../models/PostDB'
import { IRepository } from '../interfaces/IRepository'


export class PostRepository implements IRepository<IPost>
{
    async create(payload: IPost) 
    {
        // Implementation here...
        const postDB = new PostDB()
        Object.assign(postDB, payload)
        const created_postDB = await postDB.save()
        const created_post_interface = created_postDB as IPost
        return created_post_interface
    }
    
    async get(filter?: Partial<IPost>) 
    {
        // Implementation here...
        const postsDB = await PostDB.find({...filter})
        const posts_interface = postsDB as IPost[]
        return posts_interface
    }

    async getById(id: string)
    {
        // Implementation here...
        return (await this.get({ id }))[0]
    }

    async getByIds(ids: string[]) 
    {
        // Implementation here...
        const postsDB = await PostDB.find({ id: { $in: ids } })
        const posts_interface = postsDB as IPost[]
        return posts_interface
    }

    async update(id: string, user: Partial<IPost>) 
    {
        // Implementation here...
        await PostDB.updateOne({ id }, user)
        const updatedPost = await this.getById(id)
        return updatedPost
    }

    async delete(filter?: Partial<IPost>) 
    {
        // Implementation here...
        await PostDB.deleteMany(filter)
    }

    async deleteByIds(ids: string[]) 
    {
        // Implementation here...
        await PostDB.deleteMany({ id: { $in: ids } })
    }
}