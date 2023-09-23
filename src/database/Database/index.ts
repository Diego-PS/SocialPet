import { config } from '../../config'
import { Database } from './implementations/Database'

export const db = new Database(`${config.DB_CONNECTION}`)