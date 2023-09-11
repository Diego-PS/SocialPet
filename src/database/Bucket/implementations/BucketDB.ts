import fs from 'fs'
import { Bucket } from '../interfaces/Bucket'

export class BucketDB extends Bucket {

    public uploadFile = (path: fs.PathLike) => {
        fs.createReadStream(path)
            .pipe(this.bucket.openUploadStream('video', {
                chunkSizeBytes: 1048576,
                metadata: { field: 'video', value: 'myValue' }
            }))
    }

    public downloadFile = () => {
        this.bucket.openDownloadStreamByName('video')
            .pipe(fs.createWriteStream('./video.mp4'));
    }
}