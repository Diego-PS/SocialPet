import { app } from './app'
import { config } from './config'
import { connectDB } from './database'

const { port } = config

connectDB().then(() => {
    console.log(`Connected to database`)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => console.error(err))