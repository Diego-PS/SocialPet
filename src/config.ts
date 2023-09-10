import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.PORT,
    db: {
        local: {
            user: process.env.DB_LOCAL_USER
        }
    }
}