import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export const config = {
    PORT: process.env.PORT,
    DB_CONNECTION: process.env.DB_CONNECTION,
    DOWNLOADS_PATH: path.join(__dirname, '../tmp/downloads'),
    UPLOADS_PATH: path.join(__dirname, '../tmp/uploads'),
    APP_URL: process.env.APP_URL,
}