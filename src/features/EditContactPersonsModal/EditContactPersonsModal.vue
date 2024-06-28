<script setup lang="ts">
import cls from './EditContactPersonsModal.module.scss'
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, toRefs } from 'vue'
import { useToast } from 'vue-toastification'
import { useContactPersonsActions } from '@/features/ContactPersons/model/lib/useContactPersonsActions'
import { validatePhone } from '@/shared/lib/phone'
import CommentInput from '@/shared/ui/CommentInput/CommentInput.vue'
import type { ContactPerson } from '@/entities/ContactPerson/model/types/contactPerson'
import Switch from '@/shared/ui/Switch/Switch.vue'
import Modal from '@/shared/ui/Modal/Modal.vue'

interface Props {
    isModalOpen: boolean
    contactPersons: ContactPerson[]
}

const { onDataChange } = useContactPersonsActions()

const toast = useToast()

function setIsModalOpen(value: boolean) {
    emit('update:isModalOpen', value)
}

const columnHelper = createColumnHelper<ContactPerson>()

const props = defineProps<Props>()
const { contactPersons } = toRefs(props)

const columns = [
    columnHelper.accessor((row) => row.firstName, {
        id: 'firstName',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'Jan',
                onUpdate: onDataChange(info.row.original.id, 'firstName'),
                defaultValue: info.getValue(),
            }),
        header: 'Imię',
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'Kowalski',
                onUpdate: onDataChange(info.row.original.id, 'lastName'),
                defaultValue: info.getValue(),
            }),
        header: () => 'Nazwisko',
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
        header: () => 'Telefon',
    }),
    columnHelper.accessor((row) => row.role, {
        id: 'role',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'kierownik',
                onUpdate: onDataChange(info.row.original.id, 'role'),
                defaultValue: info.getValue(),
            }),
        header: () => 'Role',
    }),
    columnHelper.accessor((row) => row.email, {
        id: 'email',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'jan.kowalski@gmail.com',
                onUpdate: onDataChange(info.row.original.id, 'email'),
                defaultValue: info.getValue(),
            }),
        header: () => 'E-mail',
    }),
    columnHelper.accessor((row) => row.top, {
        id: 'top',
        cell: (info) => {
            const id = info.row.original.id
            const storedValue = localStorage.getItem(`switch_${id}`)
            const isTop = storedValue
                ? JSON.parse(storedValue)
                : info.getValue()

            return h(Switch, {
                modelValue: isTop,
                name: `top_${id}`,
                'onUpdate:modelValue': (newValue) => {
                    onDataChange(id, 'top')(newValue)
                },
            })
        },
        header: () => 'Top',
    }),
]
const table = useVueTable({
    columns,
    get data() {
        return contactPersons.value || []
    },
    getCoreRowModel: getCoreRowModel(),
})

const emit = defineEmits(['update:isModalOpen'])
</script>

<template>
    <Modal
        :is-open="isModalOpen"
        title="Edytuj osoby kontaktowe"
        @update:isOpen="setIsModalOpen"
    >
        <div :class="cls.tableWrapper">
            <table :class="cls.table">
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
                        :class="cls.row"
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
    </Modal>
</template>
