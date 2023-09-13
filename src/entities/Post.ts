import { IPost } from '../interfaces/IPost'
import fs from 'fs'
import { v4 } from 'uuid'
import { services } from '../services'

export interface PostParams {
    id?: string
    textContent?: string
    mediaPath?: string
}

export class Post implements IPost {

    public static getAll = async () => await services.post.getAll()

    id: string
    textContent?: string
    mediaFileId?: string

    private initialized = false

    constructor(params: PostParams) {
        this.id = params.id ?? v4()
        this.textContent = params.textContent
        this.mediaFileId = params.mediaPath
    }

    public create = async () => await services.post.create(this)

}