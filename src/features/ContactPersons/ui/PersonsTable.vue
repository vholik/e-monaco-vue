<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import cls from './PersonsTable.module.scss'
import { useContactPersons } from '@/entities/ContactPerson/model/services/useContactPersons'
import { useContactPersonsActions } from '@/features/ContactPersons/model/lib/useContactPersonsActions'
import type { ContactPerson } from '@/entities/ContactPerson/model/types/contactPerson'

const { data, isLoading } = useContactPersons()
const { onDataChange } = useContactPersonsActions()

const columnHelper = createColumnHelper<any>()

const columns = [
    columnHelper.accessor((row) => row.firstName, {
        id: 'firstName',
        header: () => h('div', 'Imię'),
        cell: (info) => h('div', info.row.original.firstName),
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        header: () => h('div', 'Nazwisko'),
        cell: (info) => h('div', info.row.original.lastName),
    }),
    columnHelper.accessor((row) => row.phone, {
        id: 'phone',
        header: () => h('div', 'Telefon'),
        cell: (info) => h('div', info.row.original.phone),
    }),
    columnHelper.accessor((row) => row.email, {
        id: 'email',
        header: () => h('div', 'Email'),
        cell: (info) => h('div', info.row.original.email),
    }),
]

const table = useVueTable({
    columns,
    data: data.value?.persons || [],
    getCoreRowModel: getCoreRowModel(),
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
                    v-for="(row, index) in table.getRowModel().rows"
                    :key="row.id"
                    :class="[cls.row, { [cls.marked]: index % 2 === 0 }]"
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
        <div
            v-if="!data?.persons?.length && !isLoading"
            :class="cls.noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
        <CompaniesPagination :count="data?.count || 0" />
    </div>
</template>
