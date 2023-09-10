import { app } from './app'
import { config } from './config'
import { db } from './database'

const { port } = config

db.connect().then(() => {
    console.log(`Connected to database`)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => console.error(err))