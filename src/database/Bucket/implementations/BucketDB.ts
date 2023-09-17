import fs from 'fs'
import { Bucket } from '../interfaces/Bucket'
import { config } from '../../../config'
import mongoose from 'mongoose'

export class BucketDB extends Bucket {

    public uploadFile = (fileId: string) => 
    {
        // implementation here...
        const path = `${config.UPLOADS_PATH}/${fileId}`
        fs.createReadStream(path)
            .pipe(this.bucket.openUploadStream(fileId.toLocaleString(), {
                chunkSizeBytes: 1048576,
            }))
    }

    public downloadFile = (name: string, destinyDir: string) => 
    {
        // implementation here...
        const originPath = `${destinyDir}/${name}`
        this.bucket.openDownloadStreamByName(name)
            .pipe(fs.createWriteStream(originPath));
    }

    public deleteFile = async (fileId: string) => 
    {
        // implementation here...
        const path = `${config.DOWNLOADS_PATH}/${fileId}`
        if (fs.existsSync(path)) await fs.promises.unlink(path)
        const files = this.bucket.find({ filename: fileId })
        for await (const file of files) {
            if (!file) throw new Error(`No file with id ${fileId}`)
            this.bucket.delete(new mongoose.Types.ObjectId(file._id))
        }
    }
}