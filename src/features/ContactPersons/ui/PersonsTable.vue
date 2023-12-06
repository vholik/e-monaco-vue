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
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'
import CompaniesPagination from '@/features/Company/ui/CompaniesPagination/CompaniesPagination.vue'
import { useDeletePersons } from '@/features/ContactPersons/model/services/useDeletePersons'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import Switch from '@/shared/ui/Switch/Switch.vue'

const { mutateAsync } = useDeletePersons()

const handleDelete = async (id: string) => {
    try {
        await mutateAsync(id)
    } catch (error) {
        toast.error('Błąd podczas usuwania rekordu:', error)
    }
}

const { data, isLoading } = usePersons()
const toast = useToast()
const { onDataChange } = useContactPersonsActions()
const ContactPersonsFilterStore = useContactPersonsFilterStore()

const changeOrder = (name: string) => (value: Order) => {
    ContactPersonsFilterStore.setOrder(value)
    ContactPersonsFilterStore.setOrderBy(name)
}

const columnHelper = createColumnHelper<ContactPerson>()

const toggleTop = (newValue, info) => {
    try {
        const updatedRow = { ...info.row.original }
        updatedRow.top = newValue
        onDataChange(updatedRow.id, 'top')(newValue)
    } catch (error) {
        toast.error('Wystąpił błąd podczas aktualizacji wartości "top"')
    }
}

const columns = [
    columnHelper.accessor((row) => row.firstName, {
        id: 'firstName',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'Jan',
                onUpdate: onDataChange(info.row.original.id, 'firstName'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Imię', canSort: false }),
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'Kowalski',
                onUpdate: onDataChange(info.row.original.id, 'lastName'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Nazwisko', canSort: false }),
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
        id: 'role',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'kierownik',
                onUpdate: onDataChange(info.row.original.id, 'role'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Rola', canSort: false }),
    }),
    columnHelper.accessor((row) => row.email, {
        id: 'email',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'jan.kowalski@gmail.com',
                onUpdate: onDataChange(info.row.original.id, 'email'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Email', canSort: false }),
    }),
    columnHelper.accessor((row) => row.company, {
        id: 'company',
        cell: (info) => info.getValue()?.name,

        header: () => h(SortHeader, { name: 'Nazwa firmy', canSort: false }),
    }),
    columnHelper.accessor((row) => row.top, {
        id: 'top',
        cell: (info) => {
            const isTop = info.getValue()

            return h(Switch, {
                modelValue: isTop,
                class: { checked: isTop },
                name: 'top',
                'onUpdate:modelValue': (newValue) => {
                    toggleTop(newValue, info)
                },
            })
        },
        header: () => h(SortHeader, { name: 'Top', canSort: false }),
    }),
]
const table = useVueTable({
    columns,
    // @ts-ignore
    get data() {
        return data.value?.persons || []
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
                    <DeleteButton
                        :class="cls.button"
                        :disabled="isLoading"
                        @click="handleDelete(row.original.id)"
                    >
                        Usuń
                    </DeleteButton>
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
