<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import {
    FlexRender,
    getPaginationRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { computed, h, ref } from 'vue'
import cls from './CompaniesTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { StatusSelect } from '@/entities/Status'
import { UserSelect } from '@/entities/User'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import { useCompanies } from '../../model/services/useCompanies'
import type { Company } from '@/entities/Company'
import { watch } from 'vue'

const { data } = useCompanies()
const companiesData = ref({ count: 0, companies: [] as Company[] })

const columnHelper = createColumnHelper<Company>()
const columns = [
    columnHelper.accessor((row) => row.nextContactDate, {
        id: 'nextContactDate',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Nast. kontakt', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.contactHistories, {
        id: 'comment',
        cell: (info) => h(UserSelect),
        header: () => {
            return h(SortHeader, {
                name: 'Historia kóntaktów',
                value: 'cool',
                canSort: false,
            })
        },
    }),
    columnHelper.accessor((row) => row.owner, {
        id: 'status',
        cell: (info) => h(StatusSelect),
        header: () => {
            return h(SortHeader, { name: 'Właściciel', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.comment, {
        id: 'status',
        cell: (info) => h(PriceInput),
        header: () => {
            return h(SortHeader, { name: 'Komentarz', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.nip, {
        id: 'status',
        cell: (info) => h(ContactPersonSelect),
        header: () => {
            return h(SortHeader, { name: 'NIP', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.name, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Naszwa firmy', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.status, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Status', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.municipality, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Gmina', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.rentalFee, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Wzrost podatku', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.tractorAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Zestaw', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Tabor', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Stawka ciągnik', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Stawka naczepa', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Podatek u nich', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Podatek u nas', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Oszczędność', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Aktywacja', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'status',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, { name: 'Czyńsz', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.contactPersons, {
        id: 'status',
        cell: (info) => info.getValue().join(', '),
        header: () => {
            return h(SortHeader, { name: 'Osoby kontaktowe', value: 'cool' })
        },
    }),
]

const table = useVueTable({
    columns,
    get data() {
        return companiesData.value.companies
    },
    getCoreRowModel: getCoreRowModel(),
})

watch(data, (newData: { count: number; companies: Company[] }) => {
    companiesData.value = newData
    table.setPageSize(newData.count)
})
</script>

<template>
    <div :class="cls.tableWrapper">
        <table :class="cls.CompaniesTable">
            <thead :class="cls.header">
                <tr>
                    <th
                        v-for="header in table.getFlatHeaders()"
                        :key="header.id"
                        :class="cls.headerTitle"
                    >
                        <FlexRender
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="row in table.getRowModel().rows"
                    :key="row.id"
                >
                    <td
                        v-for="cell in row.getVisibleCells()"
                        :key="cell.id"
                        :class="cls.bodyValue"
                    >
                        <FlexRender
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
