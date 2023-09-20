import { Test } from './Test'

export class Describe
{
    public content: () => void
    constructor(public description: string, public children: Describe[] | Test[]) 
    {
        if (children.length == 0) throw new Error('You must have a least one test')
        children[0]
        if (children[0] instanceof Test) {
            const tests = children as Test[]
            this.content = () => {
                tests.forEach(child => test(child.description, child.test))
            }
        } else if (children[0] instanceof Describe) {
            const describes = children as Describe[]
            this.content = () => {
                describes.forEach(child => describe(child.description, child.content))
            }
        } else {
            throw new Error(`Type of children doesn't match neither Describe nor Test`)
        }
    }
}