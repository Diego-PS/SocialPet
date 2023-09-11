import { app } from './app'
import { config } from './config'
import { db } from './database/Database'

const { port } = config

const run = async () => {
    await db.setup()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

run().catch((err) => console.error(err))