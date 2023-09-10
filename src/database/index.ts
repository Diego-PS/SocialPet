
import mongoose from 'mongoose'
import { config } from '../config'

export const connectDB = () => {
    return mongoose.connect(`mongodb://${config.db.local.user}`)
}