<script setup lang="ts">
import { createColumnHelper } from '@tanstack/table-core'
import { h, ref } from 'vue'
import ContactPersonSelect from '@/entities/ContactPerson/ui/ContactPersonSelect/ContactPersonSelect.vue'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { useContactPersons } from '@/entities/ContactPerson/model/services/useContactPersons'
import type { ContactPerson } from '@/entities/ContactPerson/model/types/contactPerson'
import { useContactPersonActions } from '@/features/ContactPersons/model/lib/useContactPersonsActions'
import cls from './PersonsTable.module.scss'

const refValue = ref('')
const selectedRef = ref([])

const { onDataChange } = useContactPersonActions()
const columnHelper = createColumnHelper<ContactPerson>()
const { data, isLoading } = useContactPersons(refValue, selectedRef)

const contactPersonsColumn = columnHelper.accessor((row) => row, {
    id: 'contactPersons',
    cell: (info) =>
        h(ContactPersonSelect, {
            name: 'contactPersons',
            defaultValue: info.getValue().map((it) => it.id),
            onUpdate: onDataChange(info.row.original.id, 'contactPersonsIds'),
        }),
    header: () => h(SortHeader, { name: 'Osoby kontaktowe', canSort: false }),
})

const columns = [contactPersonsColumn]
</script>

<template>
    <div :class="cls.ContactPersons">
        <div :class="cls.tableWrapper">
            <table :class="cls.ContactPersonsTable">
                <thead :class="cls.header">
                    <tr>
                        <th :class="cls.headerTitle">
                            <FlexRender
                                :render="contactPersonsColumn.header"
                                :props="contactPersonsColumn.getContext()"
                            />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(row, index) in data?.map((row, i) => ({
                            ...row,
                            index: i,
                        })) || []"
                        :key="row.id"
                        :class="[cls.row, { [cls.marked]: index % 2 === 0 }]"
                    >
                        <td :class="cls.bodyValue">
                            <FlexRender
                                :render="contactPersonsColumn.cell"
                                :props="
                                    contactPersonsColumn.getContext({ row })
                                "
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div
                v-if="!data?.length && !isLoading"
                :class="cls.noData"
            >
                <Text color="quinary">Nie znaleziono danych</Text>
            </div>
            <LoaderContainer :is-loading="isLoading"></LoaderContainer>
        </div>
    </div>
</template>
