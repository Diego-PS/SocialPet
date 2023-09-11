import { BucketType, DatabaseType } from '../implementations/types'

export type CreateBucketType = (db: DatabaseType, name: string) => BucketType