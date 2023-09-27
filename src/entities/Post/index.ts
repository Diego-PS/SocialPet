import { IPost } from '../../interfaces/IPost'
import { v4 } from 'uuid'
import { services } from '../../services'
import { Pagination } from '../../abstractions/Pagination'

export type IPostParams = Omit<IPost, 'id'>

export class Post implements IPost 
{
    public static create = async (params: IPostParams) => 
    {
        const id = v4()
        const newPost = await services.post.create({ id, ...params })
        return newPost
    }
    
    public static getAll = async (pagination?: Pagination) => await services.post.getAll(pagination)
    public static get = async (id: string) => await services.post.getById(id)

    id: string
    textContent?: string
    mediaFileId: string

    constructor(params: IPost) {
        this.id = params.id
        this.textContent = params.textContent
        this.mediaFileId = params.mediaFileId
    }

    public download = async () => await services.post.download(this.id)
    public delete = async () => await services.post.deleteById(this.id)
}