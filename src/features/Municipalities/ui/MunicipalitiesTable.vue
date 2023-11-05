<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
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
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'
import { useMunicipality } from '@/features/Municipalities/model/services/useMunicipality'

const { mutateAsync } = useDeleteMunicipalities()
const handleDelete = async (id: number) => {
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
        return data.value || []
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
<<<<<<< HEAD
=======
        <div
            v-if="!data && !isLoading"
            :class="cls.noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
>>>>>>> 4e1fdb3faf5e739b8a1a8915cb84955f8951e9fc
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
    </div>
</template>
