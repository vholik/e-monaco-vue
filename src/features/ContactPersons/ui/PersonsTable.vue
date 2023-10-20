<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import cls from './PersonsTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { useContactPersonsFilterStore } from '@/features/PersonsFilter'
import { usePersons } from '@/features/ContactPersons/model/services/useContactPerson'
import { useToast } from 'vue-toastification'
import { useContactPersonsActions } from '@/features/ContactPersons/model/lib/useContactPersonsActions'
import { validatePhone } from '@/shared/lib/phone'
import CommentInput from '@/shared/ui/CommentInput/CommentInput.vue'
import Text from '@/shared/ui/Text/Text.vue'
import type { Order } from '@/shared/types/order'
import type { ContactPerson } from '@/entities/ContactPerson/model/types/contactPerson'

const data = ref({ persons: [] })
const isLoading = ref(true)
const toast = useToast()
const { onDataChange } = useContactPersonsActions()
const ContactPersonsFilterStore = useContactPersonsFilterStore()

const changeOrder = (name: string) => (value: Order) => {
    ContactPersonsFilterStore.setOrder(value)
    ContactPersonsFilterStore.setOrderBy(name)
}

const columnHelper = createColumnHelper<ContactPerson>()

const columns = [
    columnHelper.accessor((row) => row.firstName, {
        cell: (info) =>
            h('div', onDataChange(info.row.original.id, 'firstName')),
        id: 'firstName',
        header: () =>
            h(SortHeader, {
                name: 'Imię',
                value:
                    ContactPersonsFilterStore.getOrderBy === 'firstName'
                        ? ContactPersonsFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('firstName'),
            }),
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) =>
            h(CommentInput, onDataChange(info.row.original.id, 'lastName')),

        header: () =>
            h(SortHeader, {
                name: 'Nazwisko',
                value:
                    ContactPersonsFilterStore.getOrderBy === 'lastName'
                        ? ContactPersonsFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('lastName'),
            }),
    }),
    columnHelper.accessor((row) => row.phone, {
        id: 'phone',
        cell: (info) =>
            h(CommentInput, {
                placeholder: '123-456-789',
                onUpdate: onDataChange(info.row.original.id, 'phone'),
                defaultValue: info.getValue(),
                validateFn: (value: string) => {
                    const isValid = validatePhone(value)
                    if (!isValid) {
                        toast.error('Niepoprawny numer telefonu')
                        return isValid
                    }
                    return isValid
                },
            }),
        header: () => h(SortHeader, { name: 'Telefon', canSort: false }),
    }),
    columnHelper.accessor((row) => row.role, {
        cell: (info) => h('div', onDataChange(info.row.original.id, 'role')),
        id: 'role',
        header: () =>
            h(SortHeader, {
                name: 'Rola',
                value:
                    ContactPersonsFilterStore.getOrderBy === 'role'
                        ? ContactPersonsFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('role'),
            }),
    }),
]
const table = useVueTable({
    columns,
    get data() {
        return data.value!.persons || []
    },
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
            v-if="!data || (!data.persons.length && !isLoading)"
            :class="cls.noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
    </div>
</template>
