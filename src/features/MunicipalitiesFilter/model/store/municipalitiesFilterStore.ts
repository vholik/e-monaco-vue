import type { Order } from '@/shared/types/order'
import { defineStore } from 'pinia'

export const useMunicipalityFilterStore = defineStore('municipalityFilter', {
    state: () => ({
        owners: [] as string[],
        order: null as null | Order,
        municipalities: [] as string[],
        orderBy: null as null | string,
        page: 1,
        q: '',
    }),
    getters: {
        getOwners(state) {
            return state.owners
        },
        getOrder(state) {
            return state.order
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
        setOrder(value: null | Order) {
            this.order = value
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
})
