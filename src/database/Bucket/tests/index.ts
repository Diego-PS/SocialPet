import { Describe } from '../../../abstractions/Test/Describe'
import { copyImageToUploadsTests } from './copyImageToUploads'

const describes =
[
    copyImageToUploadsTests
]

export const bucketTests = new Describe('Bucket tests', describes)