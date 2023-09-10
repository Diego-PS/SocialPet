import express from 'express'
import { TestDB } from './database/models/TestDB'

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