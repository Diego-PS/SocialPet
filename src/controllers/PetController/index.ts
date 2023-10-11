import { createPet } from './createPet'
import { deletePet } from './deletePet'
import { getAllPets } from './getAllPets'
import { getPostsFromPet } from './getPostsFromPet'

export const petController =
{
    createPet: createPet,
    deletePet: deletePet,
    getAllPets: getAllPets,
    getPostsFromPets: getPostsFromPet,
}
