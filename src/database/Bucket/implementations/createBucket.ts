import mongoose from 'mongoose'
import { CreateBucketType } from '../interfaces/CreateBucketType'
import { DatabaseType } from './types'

export const createBucket: CreateBucketType = (db: DatabaseType, name: string) => 
{
    // Implementation here...
    return new mongoose.mongo.GridFSBucket(db, { bucketName: name })
}
