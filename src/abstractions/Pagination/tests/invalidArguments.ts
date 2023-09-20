import { Pagination } from '..'

export const teste = {
    desc: 'Teste',
    test: () => {
        const pagination = new Pagination({ page: 1, itensPerPage: 10 })
        expect(pagination.getOffset()).toBe(0)
    }
}