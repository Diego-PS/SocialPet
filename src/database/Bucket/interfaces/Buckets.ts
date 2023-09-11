import { BucketDB } from '../implementations/BucketDB'
import { DatabaseType } from '../implementations/types'

export interface BucketsParams
{
    database: DatabaseType
}

export class Buckets {
    public media: BucketDB
    public text: BucketDB
    public profilePicture: BucketDB

    constructor(params: BucketsParams) {
        this.media = new BucketDB({ name: 'media', ...params })
        this.text = new BucketDB({ name: 'text', ...params })
        this.profilePicture = new BucketDB({ name: 'profilePicture', ...params })
    }
}