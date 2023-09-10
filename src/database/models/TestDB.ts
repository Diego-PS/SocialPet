import { Schema, model } from 'mongoose'
import { ITest } from '../../entities/Test'


export const testSchema = new Schema<ITest>({
    text: { type: String, required: true },
    num: { type: Number }
})

export const TestDB = model<ITest>('Test', testSchema)