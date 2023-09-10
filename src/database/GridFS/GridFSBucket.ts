import mongoose from 'mongoose'
import fs from 'fs'

export class GridFSBucket {

    constructor(private bucket: mongoose.mongo.GridFSBucket) {}

    // constructor() {
    //     const db = mongoose.connection.db
    //     this.bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "bucket" })
    // }

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