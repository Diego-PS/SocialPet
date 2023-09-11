import express from 'express'
import { TestDB } from './database/models/TestDB'
import path from 'path'
import { db } from './database/Database'

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

app.post('/upload', async (req, res) => {
    const filePath = path.join(__dirname, 'teste.txt')
    db.buckets.media.uploadFile(filePath)
    res.send({ status: 'Finished' })
})

app.get('/download', async (req, res) => {
    db.buckets.media.downloadFile()
    res.send({ status: 'Downloaded' })
})