import { Router } from 'express'
import { postRoutes } from './postRoutes'

export const router = Router()

router.use('/post', postRoutes)