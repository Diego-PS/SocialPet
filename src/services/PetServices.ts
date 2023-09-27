import { config } from '../config'
import { repositories } from '../database/repositories'
import { Post } from '../entities/Post'
import { IPost } from '../interfaces/IPost'
import { Pagination } from '../abstractions/Pagination'
import fs from 'fs'
import { Buckets } from '../database/Bucket/interfaces/Buckets'
import { Time } from '../abstractions/Time'
import { IPet } from '../interfaces/IPet'
import { Pet } from '../entities/Pet'

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
        const petInterface = await repositories.pet.create(petPayload)
        const pet = new Pet(petInterface)
        return pet
    }

    async getAll(pagination?: Pagination)
    {
        const petInterfaces = await repositories.pet.get({}, pagination)
        const pets = petInterfaces.map(petInterface => new Pet(petInterface))
        return pets
    }

    async getById(id: string)
    {
        const petInterface: IPet = await repositories.pet.getById(id)
        const pet = new Pet(petInterface)
        return pet
    }

    async getPostsFromPet(id: string, pagination?: Pagination)
    {
        const posts = await repositories.post.get({ petId: id }, pagination)
        return posts
    }

    async deleteById(id: string) 
    {
        const pet = await repositories.pet.getById(id)
        await repositories.post.delete({ petId: id })
        if (pet.profilePictureId) 
            await Buckets.profilePicture.deleteFile(pet.profilePictureId)
        await repositories.pet.delete({ id })
    }
}