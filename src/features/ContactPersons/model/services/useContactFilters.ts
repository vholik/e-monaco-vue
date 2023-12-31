import { defineStore } from 'pinia'

export const useContactPersonsFilterStore = defineStore(
    'contactPersonsFilter',
    {
        state: () => ({
            owners: [] as string[],
            municipalities: [] as string[],
            orderBy: null as null | string,
            page: 1,
            q: '',
        }),
        getters: {
            getOwners(state) {
                return state.owners
            },
            getMunicipalities(state) {
                return state.municipalities
            },
            getOrderBy(state) {
                return state.orderBy
            },
            getCurrentPage(state) {
                return state.page
            },
            getSearchTerm(state) {
                return state.q
            },
        },
        actions: {
            toPreviousPage() {
                this.page -= 1
            },
            toNextPage() {
                this.page += 1
            },
            setOwners(owners: string[]) {
                this.owners = owners
                this.page = 1
            },
            setMunicipalities(municipalities: string[]) {
                this.municipalities = municipalities
                this.page = 1
            },
            setOrderBy(value: string | null) {
                this.orderBy = value
                this.page = 1
            },
            setSearchTerm(value: string) {
                this.q = value
                this.page = 1
            },
        },
    },
)
