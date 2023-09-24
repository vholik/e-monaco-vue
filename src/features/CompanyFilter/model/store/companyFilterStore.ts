import type { CompanyStatus } from '@/entities/Status'
import type { Order } from '@/shared/types/order'
import { defineStore } from 'pinia'

export const useCompanyFilterStore = defineStore('companyFilter', {
    state: () => ({
        owners: [] as string[],
        status: null as null | CompanyStatus,
        municipalities: [] as string[],
        contactPersons: [] as string[],
        order: null as null | Order,
        orderBy: null as null | string,
        page: 1,
    }),
    getters: {
        getOwners(state) {
            return state.owners
        },
        getStatus(state) {
            return state.status
        },
        getMunicipalities(state) {
            return state.municipalities
        },
        getOrder(state) {
            return state.order
        },
        getOrderBy(state) {
            return state.orderBy
        },
        getContactPersons(state) {
            return state.contactPersons
        },
        getFilter(state) {
            return state.contactPersons
        },
    },
    actions: {
        setOwners(owners: string[]) {
            this.owners = owners
        },
        setContactPersons(value: string[]) {
            this.contactPersons = value
        },
        setStatus(status: CompanyStatus | null) {
            this.status = status
        },
        setMunicipalities(municipalities: string[]) {
            this.municipalities = municipalities
        },
        setOrder(value: null | Order) {
            this.order = value
        },
        setOrderBy(value: string | null) {
            this.orderBy = value
        },
    },
})
