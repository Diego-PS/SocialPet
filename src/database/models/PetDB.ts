import { Schema, model } from 'mongoose'
import { IPet } from '../../interfaces/IPet'

const petSchema = new Schema<IPet>({
    id: { type: String, unique: true, required: true },
    name: { type: String },
    profilePictureId: { type: String, unique: true },
    createdUTCDateTime: { type: String, required: true },
})

export const PetDB = model<IPet>('Post', petSchema)