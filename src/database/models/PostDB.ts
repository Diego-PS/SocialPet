import { Schema, model } from 'mongoose'
import { IPost } from '../../entities/Post'

export const postSchema = new Schema<IPost>({
    id: { type: String, unique: true, required: true },
    petId: { type: String, unique: true, required: true },
    textContent: { type: String },
    mediaFileId: { type: String, unique: true },
})

export const PostDB = model<IPost>('Post', postSchema)