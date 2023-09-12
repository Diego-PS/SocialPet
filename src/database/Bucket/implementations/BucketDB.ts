import fs from 'fs'
import { Bucket } from '../interfaces/Bucket'

export class BucketDB extends Bucket {

    public uploadFile = (path: fs.PathLike) => {
        fs.createReadStream(path)
            .pipe(this.bucket.openUploadStream(path.toLocaleString(), {
                chunkSizeBytes: 1048576,
            }))
    }

    public downloadFile = () => {
        this.bucket.openDownloadStreamByName('image')
            .pipe(fs.createWriteStream('./image.png'));
    }
}