import fs from 'fs'
import { Bucket } from '../interfaces/Bucket'

export class BucketDB extends Bucket {

    public uploadFile = (path: fs.PathLike) => {
        fs.createReadStream(path)
            .pipe(this.bucket.openUploadStream('myFile', {
                chunkSizeBytes: 1048576,
                metadata: { field: 'myField', value: 'myValue' }
            }))
    }

    public downloadFile = () => {
        this.bucket.openDownloadStreamByName('myFile')
            .pipe(fs.createWriteStream('./outputFile'));
    }
}