import { v4 } from 'uuid'
import { Test } from '../../../../abstractions/Test/Test'
import { repositories } from '../..'
import { IPost } from '../../../../interfaces/IPost'

const generatePost = (args?: { withTextContent?: boolean }) => {
    const id = v4()
    const mediaFileId = v4()
    const textContent = args?.withTextContent ? 'Some text content' : undefined
    const post = { id, mediaFileId, textContent }
    return post
}

const tests =
[
    new Test('generatePost function without textContent', () => {
        const post = generatePost()
        expect(post.id).toBeDefined()
        expect(post.mediaFileId).toBeDefined()
        expect(post.textContent).toBeUndefined()
    }),

    new Test('generatePost function with textContent', () => {
        const post = generatePost({ withTextContent: true })
        expect(post.id).toBeDefined()
        expect(post.mediaFileId).toBeDefined()
        expect(post.mediaFileId).toBe('Some text content')
    }),

    new Test('create without textContent', async () => {
        const post = generatePost()
        await repositories.post.create(post)
        const newPost = await repositories.post.getById(post.id)
        expect(newPost).toEqual(post)
    }),

    new Test('create with textContent', async () => {
        const post = generatePost({ withTextContent: true })
        await repositories.post.create(post)
        const newPost = await repositories.post.getById(post.id)
        expect(newPost).toEqual(post)
    }),

    new Test('update mediaFileId', async () => {
        const post = generatePost()
        await repositories.post.create(post)
        const updatedPost = await repositories.post.update(post.id, { mediaFileId: 'new mediaFileId' })
        expect(updatedPost as Omit<IPost, 'mediaFileId'>).toEqual(post as Omit<IPost, 'mediaFileId'>)
        expect(updatedPost.mediaFileId).toBe('new mediaFileId')
    }),

    new Test('update textContent', async () => {
        const post = generatePost({ withTextContent: true })
        await repositories.post.create(post)
        const updatedPost = await repositories.post.update(post.id, { textContent: 'new textContent' })
        expect(updatedPost as Omit<IPost, 'mediaFileId'>).toEqual(post as Omit<IPost, 'mediaFileId'>)
        expect(updatedPost.mediaFileId).toBe('new textContent')
    }),

    new Test('get', async () => {
        const posts = [generatePost(), generatePost()]
        for (const post of posts) 
            await repositories.post.create(post)
        const retrievedPosts = await repositories.post.get({ mediaFileId: posts[0].mediaFileId })
        expect(retrievedPosts.length).toBe(1)
        expect(retrievedPosts[0]).toEqual(posts[0])
    }),

    new Test('getByIds', async () => {
        const posts = [generatePost(), generatePost(), generatePost()]
        for (const post of posts) 
            await repositories.post.create(post)
        const retrievedPosts = await repositories.post.getByIds([posts[0].id, posts[2].id])
        expect(retrievedPosts.length).toBe(2)
        expect(retrievedPosts).toEqual(expect.arrayContaining([posts[0], posts[2]]))
    }),

    new Test('delete with existing id', async () => {
        const post = generatePost()
        await repositories.post.create(post)
        await repositories.post.delete({ mediaFileId: post.mediaFileId })
        const retrievedPosts = await repositories.post.get({ id: post.id })
        expect(retrievedPosts.length).toBe(0)
    })
]

// export const invalidArguments = new Describe('Invalid arguments', tests)

// test('Create user', async () => {
//     const id = v4()
//     const post = {
//         id,
//         mediaFileId: 'test'
//     }
//     await repositories.post.create(post)
//     const newPost = await repositories.post.getById(id)
//     expect(newPost.id).toBe(post.id)
// })

