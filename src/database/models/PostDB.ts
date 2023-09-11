import { Schema, model } from 'mongoose'
import { ITest } from '../../entities/Test'
import { IPost } from '../../entities/Post'

export const testSchema = new Schema<IPost>({
    id: { type: String, unique: true, required: true },
    petId: { type: String },
    textFileId: { type: String, unique: true },
    mediaFileId: { type: String, unique: true },
})

export const TestDB = model<ITest>('Test', testSchema)