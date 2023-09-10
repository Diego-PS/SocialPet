
import mongoose from 'mongoose'
import { config } from '../config'
import { GridFSBucket } from './GridFS/GridFSBucket'

class DB {
    
    public bucket!: GridFSBucket
    public connect = async () => {
        const db = await mongoose.connect(`mongodb://${config.db.local.user}`)
        this.bucket = new GridFSBucket()
        return db
    }
}

export const db = new DB()

// export const db = 
// {
//     connectDB: () => {
//         return mongoose.connect(`mongodb://${config.db.local.user}`).then(() => {

//         })
//     },
//     bucket: new GridFSBucket()
// }

// export const connectDB = () => {
//     return mongoose.connect(`mongodb://${config.db.local.user}`)
// }