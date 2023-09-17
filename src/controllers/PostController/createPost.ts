import { Request, Response } from 'express'
import { ErrorBody } from '../ErrorBody'
import fs from 'fs'
import { Post } from '../../entities/Post'

interface CreatePostReqBody {
    textContent?: string
}

export type CreatePostRequest = Request<{}, {}, CreatePostReqBody>

interface CreatePostResBody {
    id: string,
    fileId?: string
}

export type CreatePostResponse = Response<ErrorBody | CreatePostResBody>

export const createPost = async (req: CreatePostRequest, res: CreatePostResponse) =>
{
    try {
        if (!req.file?.path) {
            return res.status(500).send({ error: 'Upload was unsuccessful' })
        }
        const filePath = req.file?.path
        const extension = req.file.originalname.split('.').at(-1)
        const newName = `${req.file.filename}.${extension}`
        await fs.promises.rename(filePath, `${filePath}.${extension}`)
        const post = await Post.create({ textContent: req.body.textContent, mediaId: newName })
        return res.status(200).send({ id: post.id, fileId: post.mediaFileId })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}