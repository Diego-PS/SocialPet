import mongoose from 'mongoose'
import { Buckets } from '../../Bucket/interfaces/Buckets'
import { AbstractDatabase } from '../interfaces/AbstractDatabase'
import { PostDB } from '../../models/PostDB'

export class Database extends AbstractDatabase 
{
    public buckets!: Buckets

    protected connect = async (uri: string) => 
    {
        // Connect implementation here...
        await mongoose.connect(uri)

        // Successfully connected
        console.log(`Connected to database`)
    }
    
    protected setupBuckets = () =>
    {
        // Setup implementation here...
        const db = mongoose.connection.db
        this.buckets = new Buckets({ database: db })

        // Successfully setted up the buckets
        console.log(`Setted up the buckets`)
    }

    public clear = async () => 
    {
        // Clear implementation here...
        const collections = await mongoose.connection.db?.collections();
        if (!collections) return

        for (let collection of collections) {
            await collection.deleteMany({})
        }
    }

}