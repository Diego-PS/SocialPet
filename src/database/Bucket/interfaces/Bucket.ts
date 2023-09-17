import fs from 'fs'
import { BucketsParams } from './Buckets'
import { createBucket } from '../implementations/createBucket'
import { BucketType } from '../implementations/types'

interface BucketParams extends BucketsParams
{
    name: string
}

export abstract class Bucket
{
    protected name: string
    protected bucket: BucketType

    constructor(params: BucketParams) {
        this.name = params.name
        this.bucket = createBucket(params.database, this.name)
    }

    public abstract uploadFile: (fileId: string) => void
    public abstract downloadFile: (name: string, destinyDir: string) => void
    public abstract deleteFile: (fileId: string) => void
}