import { Buckets } from '../../Bucket/interfaces/Buckets'

export abstract class AbstractDatabase 
{
    public abstract buckets: Buckets

    protected abstract connect: () => Promise<void>
    protected abstract setupBuckets: () => void

    public setup = async () => {
        await this.connect()
        this.setupBuckets()
    }
}