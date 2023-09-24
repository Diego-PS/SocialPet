import mongoose from 'mongoose'
import { Buckets } from '../../Bucket/interfaces/Buckets'
import { AbstractDatabase } from '../interfaces/AbstractDatabase'
import { MongoMemoryServer } from 'mongodb-memory-server'

export class MockDB extends AbstractDatabase 
{
    public buckets!: Buckets
    private mongod?: MongoMemoryServer

    protected connect = async () => 
    {
        // Connect implementation here...
        this.mongod = await MongoMemoryServer.create()
        const uri = this.mongod.getUri()
        await mongoose.connect(uri)
    }

    public disconnect = async () =>
    {
        await this.mongod?.stop()
    }
    
    protected setupBuckets = () =>
    {
        // Setup implementation here...
        const db = mongoose.connection.db
        this.buckets = new Buckets({ database: db })
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