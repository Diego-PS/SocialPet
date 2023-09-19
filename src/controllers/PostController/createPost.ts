import { Request, Response } from 'express'
import fs from 'fs'
import { Post } from '../../entities/Post'
import { ErrorBody } from '../../types/ErrorBody'

interface CreatePostReqBody {
    textContent?: string,
}

export type CreatePostRequest = Request<{}, {}, CreatePostReqBody>

interface CreatePostResBody {
    id: string,
    fileId: string,
    textContent?: string,
}

export type CreatePostResponse = Response<ErrorBody | CreatePostResBody>

export const createPost = async (req: CreatePostRequest, res: CreatePostResponse) =>
{
    try {
        if (!req.file?.path) {
            return res.status(500).send({ error: 'Upload was unsuccessful' })
        }
        const filePath = req.file.path
        const extension = req.file.originalname.split('.').at(-1)
        console.log(req.file.path)
        const newName = `${req.file.filename}.${extension}`
        console.log(newName)
        await fs.promises.rename(filePath, `${filePath}.${extension}`)
        const post = await Post.create({ textContent: req.body.textContent, mediaId: newName })
        return res.status(200).send({ id: post.id, fileId: post.mediaFileId, textContent: post.textContent })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}