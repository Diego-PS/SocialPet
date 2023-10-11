import { Request, Response } from 'express'
import { IPagination, Pagination } from '../../abstractions/Pagination'
import { ErrorBody } from '../../types/ErrorBody'
import { IPet } from '../../interfaces/IPet'
import { Pet } from '../../entities/Pet'

interface GetAllPetsReqBody {
    pagination?: IPagination,
}

export type GetAllPetsRequest = Request<{}, {}, GetAllPetsReqBody>

export interface IPetWithUrl extends Omit<IPet, 'id' | 'petId'> {
    profilePicUrl?: string
}

interface GetAllPetsResBody {
    pets: IPetWithUrl[]
}

export type GetAllPetsResponse = Response<ErrorBody | GetAllPetsResBody>

export const getAllPets = async (req: GetAllPetsRequest, res: GetAllPetsResponse) =>
{
    try {
        const pagination = req.body.pagination ? new Pagination(req.body.pagination) : undefined
        const pets = await Pet.getAll(pagination)
        const petsWithUrl = await getPetsWithUrl(pets)
        return res.status(200).send({ pets: petsWithUrl })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}

const getPetsWithUrl = async (pets: Pet[]) => 
{
    const petsWithUrl: IPetWithUrl[] = []
    for (const pet of pets) {
        const { url } = await pet.downloadProfilePic()
        petsWithUrl.push({ 
            ...pet,
            profilePicUrl: url
        })
    }
    return petsWithUrl
}