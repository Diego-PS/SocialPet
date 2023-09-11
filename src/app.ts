import express from 'express'
import { TestDB } from './database/models/TestDB'
import path from 'path'
import { db } from './database/Database'
import multer from 'multer'

export const app = express()

app.get('/', (req, res) => {
    res.send({ satus: 'OK' })
})

app.post('/', async (req, res) => {
    const testDB = new TestDB()
    const text = 'Teste 2'
    const num = 2
    Object.assign(testDB, {text, num})
    await testDB.save()
    res.send({ msg: `Created test with text ${text} and num ${num}` })
})

app.post('/upload', multer({ dest: 'tmp/' }).single('form'), async (req, res) => {
    if (!req.file?.path) {
        return res.status(500).send({ error: 'Upload was unsuccessful' })
    }
    const filePath = req.file?.path
    db.buckets.media.uploadFile(filePath)
    res.send({ status: 'Finished' })
})

app.get('/download', async (req, res) => {
    db.buckets.media.downloadFile()
    res.send({ status: 'Downloaded' })
})

