<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h } from 'vue'
import cls from './MunicipalitiesTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { useToast } from 'vue-toastification'
import { useMunicipalityActions } from '@/features/Municipalities/model/lib/useManicipalitiesActions'
import CommentInput from '@/shared/ui/CommentInput/CommentInput.vue'
import Text from '@/shared/ui/Text/Text.vue'
import type { Municipality } from '@/entities/Municipality/model/types/municipality'
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'
import { useDeleteMunicipalities } from '@/features/Municipalities/model/services/useDeleteMunicipalities'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import { useMunicipality } from '@/features/Municipalities/model/services/useMunicipality'
import MunicaplitiesPagination from '@/features/Municipalities/ui/MunicipalitiesPagination/MunicipalitiesPagination.vue'

const { mutateAsync } = useDeleteMunicipalities()
const handleDelete = async (id: string) => {
    try {
        await mutateAsync(id)
    } catch (error) {
        toast.error('Błąd podczas usuwania rekordu')
    }
}

const { data, isLoading } = useMunicipality()
const toast = useToast()
const { onDataChange } = useMunicipalityActions()

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
    columnHelper.accessor((row) => row.kitrate, {
        id: 'kitRate',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Zestaw', canSort: false }),
    }),
    columnHelper.accessor((row) => row.taxincrease, {
        id: 'taxIncrease',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Wzrost podatku', canSort: false }),
    }),
    columnHelper.accessor((row) => row.currentYearRate?.trailerRate, {
        id: 'trailerRate',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Stawka naczepa', canSort: false }),
    }),
    columnHelper.accessor((row) => row.currentYearRate?.tractorRate, {
        id: 'tractorRate',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () =>
            h(SortHeader, { name: 'Stawka ciągniki', canSort: false }),
    }),
    columnHelper.accessor((row) => row.currentYearRate?.otherRate, {
        id: 'otherRate',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Stawka inne', canSort: false }),
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
                            :class="cls.flexRender"
                        />
                    </td>
                    <td :class="cls.bodyValue">
                        <DeleteButton
                            :class="cls.button"
                            :disabled="isLoading"
                            @click="handleDelete(row.original.id)"
                        >
                            Usuń
                        </DeleteButton>
                    </td>
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
        <MunicaplitiesPagination :count="data?.count || 0" />
    </div>
</template>
