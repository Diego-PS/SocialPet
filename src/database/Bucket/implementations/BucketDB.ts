import fs from 'fs'
import { Bucket } from '../interfaces/Bucket'

export class BucketDB extends Bucket {

    public uploadFile = (path: fs.PathLike) => 
    {
        // get only file name and extension
        const name = path.toString().split('/').at(-1)

        if (!name) throw new Error('file path is not specified correctly')

        fs.createReadStream(path)
            .pipe(this.bucket.openUploadStream(name.toLocaleString(), {
                chunkSizeBytes: 1048576,
            }))

        return { name }
    }

    public downloadFile = (name: string, destinyDir: string) => {
        const originPath = `${destinyDir}/${name}`

        this.bucket.openDownloadStreamByName(name)
            .pipe(fs.createWriteStream(originPath));
    }
}