import { config } from '../config'
import { repositories } from '../database/repositories'
import { Post } from '../entities/Post'
import { IPost } from '../interfaces/IPost'
import { Pagination } from '../abstractions/Pagination'
import fs from 'fs'
import { Buckets } from '../database/Bucket/interfaces/Buckets'
import { Time } from '../abstractions/Time'
import { IPet } from '../interfaces/IPet'

export type IPetWithoutCreated = Omit<IPet, 'createdUTCDateTime'>

export class PetServices
{
    async create(params: IPetWithoutCreated) 
    {
        if(params.profilePictureId)
            await Buckets.profilePicture.uploadFile(params.profilePictureId)
        const date = await Time.now()
        const createdUTCDateTime = date.toUTCString()
        const petPayload: IPet = { ...params, createdUTCDateTime }
        const postInterface = await repositories.pet.create(petPayload)
        const pet = new Post(postInterface)
        return post
    }

    async download(id: string)
    {
        const post = await repositories.post.getById(id)
        if (!fs.existsSync(config.DOWNLOADS_PATH)) fs.mkdirSync(config.DOWNLOADS_PATH)
        if (post.mediaFileId && !fs.existsSync(`${config.DOWNLOADS_PATH}/${post.mediaFileId}`)) 
            await Buckets.media.downloadFile(post.mediaFileId, config.DOWNLOADS_PATH)
        return { url: `${config.APP_URL}/static/${post.mediaFileId}` }
    }

    async getAll(pagination?: Pagination)
    {
        const postInterfaces = await repositories.post.get({}, pagination)
        const posts = postInterfaces.map(postInterface => new Post(postInterface))
        return posts
    }

    async getById(id: string)
    {
        let postInterface: IPost
        postInterface = await repositories.post.getById(id)
        const post = new Post(postInterface)
        return post
    }

    async deleteById(id: string) 
    {
        const post = await repositories.post.getById(id)
        if (post.mediaFileId) await Buckets.media.deleteFile(post.mediaFileId)
        await repositories.post.delete({ id })
    }
}