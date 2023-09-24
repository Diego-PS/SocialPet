import { Buckets } from '../../Bucket/interfaces/Buckets'

export abstract class AbstractDatabase 
{
    public abstract buckets: Buckets

    constructor() {}

    protected abstract connect: () => Promise<void>
    protected abstract setupBuckets: () => void
    public abstract clear: () => Promise<void>
    public abstract disconnect: () => Promise<void>

    public setup = async () => {
        await this.connect()
        this.setupBuckets()
    }
}