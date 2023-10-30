<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import cls from './MunicipalitiesTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { useMunicipalityFilterStore } from '@/features/MunicipalitiesFilter'
import { useMunicipalities } from '@/features/Municipalities/model/services/useMunicipality'
import { useToast } from 'vue-toastification'
import { useMunicipalityActions } from '@/features/Municipalities/model/lib/useManicipalitiesActions'
import CommentInput from '@/shared/ui/CommentInput/CommentInput.vue'
import Text from '@/shared/ui/Text/Text.vue'
import type { Order } from '@/shared/types/order'
import type { Municipality } from '@/entities/Municipality/model/types/municipality'
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'
import CompaniesPagination from '@/features/Company/ui/CompaniesPagination/CompaniesPagination.vue'
import { useDeleteMunicipalities } from '@/features/Municipalities/model/services/useDeleteMunicipalities'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'

const { mutateAsync } = useDeleteMunicipalities()
const handleDelete = async (id: number) => {
    try {
        await mutateAsync(id)
    } catch (error) {
        toast.error('Błąd podczas usuwania rekordu:', error)
    }
}

const { data } = useMunicipalities()
const isLoading = ref(true)
const toast = useToast()
const { onDataChange } = useMunicipalityActions()
const ContactMunicipalitiesFilterStore = useMunicipalityFilterStore()

const changeOrder = (name: string) => (value: Order) => {
    ContactMunicipalitiesFilterStore.setOrder(value)
    ContactMunicipalitiesFilterStore.setOrderBy(name)
}

const columnHelper = createColumnHelper<Municipality>()

const columns = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) =>
            h(CommentInput, {
                placeholder: 'np. Prusice',
                onUpdate: onDataChange(info.row.original.id, 'name'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Nazwa gminy', canSort: false }),
    }),
    columnHelper.accessor((row) => row.taxIncrease, {
        id: 'taxIncrease',
        cell: (info) =>
            h(PriceInput, {
                placeholder: 'xxx',
                onUpdate: onDataChange(info.row.original.id, 'taxIncrease'),
                defaultValue: info.getValue(),
            }),
        header: () =>
            h(SortHeader, { name: 'Podwyżka podatku', canSort: false }),
    }),
    columnHelper.accessor((row) => row.tractorRate, {
        id: 'activation',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'tractorRate'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Ciągnik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.trailerRate, {
        id: 'trailerRate',
        cell: (info) =>
            h(PriceInput, {
                placeholder: 'xxx',
                onUpdate: onDataChange(info.row.original.id, 'trailerRate'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Przyczepa', canSort: false }),
    }),
    columnHelper.accessor((row) => row.kitRate, {
        id: 'kitRate',
        cell: (info) =>
            h(PriceInput, {
                placeholder: 'xxx',
                onUpdate: onDataChange(info.row.original.id, 'kitRate'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Zestaw', canSort: false }),
    }),
    columnHelper.accessor((row) => row.otherRate, {
        id: 'otherRate',
        cell: (info) =>
            h(PriceInput, {
                placeholder: 'xxx',
                onUpdate: onDataChange(info.row.original.id, 'otherRate'),
                defaultValue: info.getValue(),
            }),
        header: () => h(SortHeader, { name: 'Inne', canSort: false }),
    }),
]
const table = useVueTable({
    columns,
    // @ts-ignore
    get data() {
        return data.value?.municipalities || []
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
            v-if="!data?.municipalities?.length && !isLoading"
            :class="cls.noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
        <CompaniesPagination :count="data?.count || 0" />
    </div>
</template>
