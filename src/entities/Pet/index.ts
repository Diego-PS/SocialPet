import { IPost } from '../../interfaces/IPost'
import { v4 } from 'uuid'
import { services } from '../../services'
import { Pagination } from '../../abstractions/Pagination'
import { IPetWithoutCreated } from '../../services/PetServices'
import { IPet } from '../../interfaces/IPet'

export type IPetParams = Omit<IPetWithoutCreated, 'id'>

export class Pet implements IPet 
{
    // public static create = async (params: IPetParams) => 
    // {
    //     const id = v4()
    //     const newPost = await services.post.create({ id, ...params })
    //     return newPost
    // }
    
    // public static getAll = async (pagination?: Pagination) => await services.post.getAll(pagination)
    // public static get = async (id: string) => await services.post.getById(id)

    id: string
    publicId: string
    name: string
    profilePictureId?: string | undefined
    createdUTCDateTime: string

    constructor(params: IPet) {
        this.id = params.id
        this.publicId = params.publicId
        this.name = params.name
        this.profilePictureId = params.profilePictureId
        this.createdUTCDateTime = params.createdUTCDateTime
    }
}