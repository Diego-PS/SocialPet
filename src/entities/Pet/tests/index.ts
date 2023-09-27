import { Describe } from '../../../abstractions/Test/Describe'
import { staticMethodsTests } from './staticMethods'


const describes = 
[
    staticMethodsTests
]

export const petTests = new Describe('Post tests', describes)