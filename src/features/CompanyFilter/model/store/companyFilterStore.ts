import type { CompanyStatus } from '@/entities/Status'
import type { Order } from '@/shared/types/order'
import { defineStore } from 'pinia'
import { PAGE_SIZE } from '@/shared/const/pagination'
import { companyTableOptions } from '@/features/Company/model/consts/options'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const useCompanyFilterStore = defineStore('companyFilter', {
    state: () => ({
        owners: [] as string[],
        status: [] as CompanyStatus[],
        municipalities: [] as string[],
        contactPersons: [] as string[],
        order: null as null | Order,
        orderBy: null as null | string,
        page: 1,
        q: '',
        freeText: {} as Record<string, string[]>,
        take: PAGE_SIZE,
        tables: localStorage.getItem('company-tables')
            ? localStorage.getItem('company-tables')?.split(',')
            : companyTableOptions.map((option) => option.id),
        dateRange: [] as string[],
        from_next_date: '' as string,
        to_next_date: '' as string,
        campaigns: [] as string[],
    }),
    getters: {
        getTables(state) {
            return state.tables
        },
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
        getCurrentPage(state) {
            return state.page
        },
        getSearchTerm(state) {
            return state.q
        },
        getFreeTextColumn(state) {
            return (column: string) => state.freeText[column] || []
        },
        getDateRange(state) {
            return state.dateRange
        },
        getCampaigns(state) {
            return state.campaigns
        },
    },
    actions: {
        setDateRange(dateRange: string[]) {
            const localTimeZone = dayjs.tz.guess()

            const from = dateRange[0]
                ? dayjs
                      .tz(dateRange[0], localTimeZone)
                      .startOf('day')
                      .utc()
                      .format()
                : dateRange[0]

            const to = dateRange[1]
                ? dayjs
                      .tz(dateRange[1], localTimeZone)
                      .endOf('day')
                      .utc()
                      .format()
                : dateRange[1]

            this.from_next_date = from
            this.to_next_date = to

            this.page = 1
        },
        setTables(tables: string[]) {
            this.tables = tables
            localStorage.setItem('company-tables', tables.join(','))
        },
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
        setContactPersons(value: string[]) {
            this.contactPersons = value
            this.page = 1
        },
        setStatus(status: CompanyStatus[]) {
            this.status = status
            this.page = 1
        },
        setMunicipalities(municipalities: string[]) {
            this.municipalities = municipalities
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
        setFreeTextColumn(column: string, value: string[]) {
            this.freeText[column] = value
            this.page = 1
        },
        setCampaigns(campaigns: string[]) {
            this.campaigns = campaigns
            this.page = 1
        },
    },
})
