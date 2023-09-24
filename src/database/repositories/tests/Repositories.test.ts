import { MongoMemoryServer } from 'mongodb-memory-server'
import { repositoriesTests } from '.'
import { Database } from '../../Database/implementations/Database'

let mongod: MongoMemoryServer
let mock: Database

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mock = new Database(uri)
    mock.setup()
});

afterEach(async () => {
    await mock.clear()
})

afterAll(async () => {
    await mongod.stop()
});

repositoriesTests.describe()