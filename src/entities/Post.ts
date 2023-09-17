import { IPost } from '../interfaces/IPost'
import { v4 } from 'uuid'
import { services } from '../services'

export interface IPostParams {
    textContent?: string,
    mediaId?: string,
}

export class Post implements IPost 
{
    public static create = async (params: IPostParams) => 
    {
        const id = v4()
        const newPost = await services.post.create({ 
            id, 
            textContent: params.textContent,
            mediaFileId: params.mediaId,
        })
        return newPost
    }
    
    public static getAll = async () => await services.post.getAll()
    public static get = async (id: string) => await services.post.getById(id)


    id: string
    textContent?: string
    mediaFileId?: string

    constructor(params: IPost) {
        this.id = params.id
        this.textContent = params.textContent
        this.mediaFileId = params.mediaFileId
    }

    public download = async () => await services.post.download(this.id)
    public delete = async () => await services.post.deleteById(this.id)
}