import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT,
    DB: {
        LOCAL: {
            URL: process.env.DB_LOCAL_CONNECTION,
        },
        CLOUD: {
            URL: process.env.DB_CLOUD_CONNECTION,
        },
    },
    DOWNLOADS_PATH: 'tmp/downloads',
    UPLOADS_PATH: 'tmp/uploads',
    APP_URL: `http://localhost:${process.env.PORT}`,
}