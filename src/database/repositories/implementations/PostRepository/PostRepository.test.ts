import { MongoMemoryServer } from 'mongodb-memory-server'
import { Database } from '../../../Database/implementations/Database'
import { repositories } from '../..'
import { v4 } from 'uuid'

let mongod: MongoMemoryServer
let mock: Database

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mock = new Database(uri)
    mock.setup()
});

afterAll(async () => {
    await mongod.stop()
});

// beforeEach(async () => {
//     await 
// await client.db(database).collection('users').deleteMany({
//     name: 'test-user'
// });
// });

test('Create user', async () => {
    const id = v4()
    const post = {
        id,
        mediaFileId: 'test'
    }
    await repositories.post.create(post)
    const newPost = await repositories.post.getById(id)
    expect(newPost.id).toBe(post.id)
})