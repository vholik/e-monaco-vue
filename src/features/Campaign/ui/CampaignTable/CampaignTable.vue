<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import cls from './CampaignTable.module.scss'
import { h, computed, ref } from 'vue'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import Text from '@/shared/ui/Text/Text.vue'
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'
import { useCampaignSummaries } from '@/features/Campaign/model/services/useCampaignSummary'
import type { CampaignSummary } from '@/entities/Campaign/model/types/campaignSummary'

const { data, isLoading } = useCampaignSummaries()

const columnHelper = createColumnHelper<CampaignSummary>()

const columns = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.suma_leadow, {
        id: 'suma_leadow',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Suma Leadów', canSort: false }),
    }),
    columnHelper.accessor((row) => row.pozostalo, {
        id: 'pozostalo',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Pozostało', canSort: false }),
    }),
    columnHelper.accessor((row) => row.przerobiono, {
        id: 'przerobiono',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Przerobiono', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nie_odbiera, {
        id: 'nie_odbiera',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Nie Odbiera', canSort: false }),
    }),
    columnHelper.accessor((row) => row.negatywni, {
        id: 'negatywna',
        cell: (info) => info.getValue(),
        header: () => h(SortHeader, { name: 'Negatywni', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nastepna_kampania, {
        id: 'nastepna_kampania',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () =>
            h(SortHeader, { name: 'Następna Kampania', canSort: false }),
    }),
    columnHelper.accessor((row) => row.rozmowy, {
        id: 'rozmowy',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Rozmowy', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nowy_klient, {
        id: 'nowy_klient',
        cell: (info) => info.getValue() ?? 'N/A',
        header: () => h(SortHeader, { name: 'Nowy Klient', canSort: false }),
    }),
]

const table = useVueTable({
    columns,
    get data() {
        return data.value || []
    },
    getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
    <div :class="cls.tableWrapper">
        <table :class="cls.CampaignTable">
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
                </tr>
            </tbody>
        </table>
        <div
            v-if="!data?.campaigns?.length && !isLoading"
            :class="cls.noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
    </div>
</template>
