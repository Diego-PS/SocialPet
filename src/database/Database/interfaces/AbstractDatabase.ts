import { Buckets } from '../../Bucket/interfaces/Buckets'

export abstract class AbstractDatabase 
{
    public abstract buckets: Buckets

    constructor(protected uri: string) {}

    protected abstract connect: (uri: string) => Promise<void>
    protected abstract setupBuckets: () => void
    public abstract clear: () => Promise<void>

    public setup = async () => {
        await this.connect(this.uri)
        this.setupBuckets()
    }
}