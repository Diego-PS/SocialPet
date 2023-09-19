import express from 'express'
import { TestDB } from './database/models/TestDB'
import path from 'path'
import { db } from './database/Database'
import multer from 'multer'
import fs from 'fs'
import { Post } from './entities/Post'
import { router } from './routes'
import { config } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'

export const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send({ satus: 'Main route' })
})

app.post('/', async (req, res) => {
    const testDB = new TestDB()
    const text = 'Teste 2'
    const num = 2
    Object.assign(testDB, {text, num})
    await testDB.save()
    res.send({ msg: `Created test with text ${text} and num ${num}` })
})

app.use(bodyParser.json())
app.use(router)

// app.post('/upload', multer({ dest: 'tmp/uploads/' }).single('form'), async (req, res) => {
//     if (!req.file?.path) {
//         return res.status(500).send({ error: 'Upload was unsuccessful' })
//     }
//     const filePath = req.file?.path
//     console.log(req.file.originalname)
//     console.log(req.file.originalname.split('.'))
//     const extension = req.file.originalname.split('.').at(-1)
//     const newName = `${req.file.filename}.${extension}`
//     await fs.promises.rename(filePath, `${filePath}.${extension}`)
//     // res.send({ status: 'Finished' })
//     console.log(newName)
//     await Post.create({ mediaId: newName })
//     return res.send({ name: newName })
// })

// app.get('/download/:id', async (req, res) => {
//     const post = await Post.get(req.params.id)
//     await post.download()
//     res.send({ status: 'Downloaded' })
// })


app.use('/static', express.static(config.DOWNLOADS_PATH))

