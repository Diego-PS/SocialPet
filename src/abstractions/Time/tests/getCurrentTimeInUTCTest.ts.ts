import { Describe } from '../../Test/Describe'
import { Test } from '../../Test/Test'
import { getCurrentTimeInUTC } from '../implementations/getCurrentTimeInUTC'

const tests =
[
    new Test('gets current time', async () => {
        const currentTime = await getCurrentTimeInUTC()
        const now = new Date()
        expect(currentTime.toUTCString()).toBe(now.toUTCString())
    }),
]

export const getCurrentTimeInUTCTest = new Describe('get current time in UTC tests', tests)