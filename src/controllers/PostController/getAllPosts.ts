import { Request, Response } from 'express'
import { IPagination, Pagination } from '../../abstractions/Pagination'
import { ErrorBody } from '../../types/ErrorBody'
import { Post } from '../../entities/Post'
import { IPostWithUrl, getPostsWithUrl } from './utils'

interface GetAllPostsReqBody {
    pagination?: IPagination,
}

export type GetAllPostsRequest = Request<{}, {}, GetAllPostsReqBody>

interface GetAllPostsResBody {
    posts: IPostWithUrl[]
}

export type GetAllPostsResponse = Response<ErrorBody | GetAllPostsResBody>

export const getAllPosts = async (req: GetAllPostsRequest, res: GetAllPostsResponse) =>
{
    try {
        const pagination = req.body.pagination ? new Pagination(req.body.pagination) : undefined
        const posts = await Post.getAll(pagination)
        const postsWithUrl = await getPostsWithUrl(posts)
        return res.status(200).send({ posts: postsWithUrl })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}