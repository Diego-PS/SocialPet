import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT,
    DB: {
        LOCAL: {
            USER: process.env.DB_LOCAL_USER
        }
    },
    DOWNLOADS_PATH: 'tmp/downloads',
    UPLOADS_PATH: 'tmp/uploads',
}