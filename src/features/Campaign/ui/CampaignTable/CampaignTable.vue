<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import cls from './CampaignTable.module.scss'
import { h, toRefs } from 'vue'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import Text from '@/shared/ui/Text/Text.vue'
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'
import type { CampaignSummary } from '@/entities/Campaign/model/types/campaignSummary'
import { useCampaignSummary } from '../../model/services/useCampaignSummary'
import type { Campaign } from '@/entities/Campaign'

interface Props {
    campaign: Campaign
}

const { campaign } = defineProps<Props>()

const { isLoading, data } = useCampaignSummary(campaign.id)

const columnHelper = createColumnHelper<CampaignSummary>()

const columns1 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.suma_leadow, {
        id: 'suma_leadow',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Suma Leadów', canSort: false }),
    }),
    columnHelper.accessor((row) => row.pozostalo, {
        id: 'pozostalo',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Pozostało', canSort: false }),
    }),
    columnHelper.accessor((row) => row.przerobiono, {
        id: 'przerobiono',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Przerobiono', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nie_odbiera, {
        id: 'nie_odbiera',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Odbiera', canSort: false }),
    }),
    columnHelper.accessor((row) => row.negatywni, {
        id: 'negatywni',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Negatywni', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nastepna_kampania, {
        id: 'nastepna_kampania',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Następna Kampania', canSort: false }),
    }),
    columnHelper.accessor((row) => row.rozmowy, {
        id: 'rozmowy',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Rozmowy', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nowy_klient, {
        id: 'nowy_klient',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nowy Klient', canSort: false }),
    }),
]

const table1 = useVueTable({
    columns: columns1,
    get data() {
        return data.value?.campaignSummary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})

const getColorClass = (columnId: string, value: any) => {
    switch (columnId) {
        case 'suma_leadow':
            return cls.greyBackground
        case 'pozostalo':
            return cls.yellowBackground
        case 'przerobiono':
            return cls.greenBackground
        case 'nie_odbiera':
            return cls.darkGreyBackground
        case 'negatywni':
            return cls.redBackground
        case 'nastepna_kampania':
            return cls.purpleBackground
        case 'rozmowy':
            return cls.limeBackground
        case 'nowy_klient':
            return cls.greenBackground
        default:
            return ''
    }
}

const columns2 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.mala_oszczednosc, {
        id: 'mala_oszczednosc',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Mała Oszczędność', canSort: false }),
    }),
    columnHelper.accessor((row) => row.brak_kontaktu, {
        id: 'brak_kontaktu',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Brak Kontaktu', canSort: false }),
    }),
    columnHelper.accessor((row) => row.dzialalnosc, {
        id: 'dzialalnosc',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Działalność', canSort: false }),
    }),
    columnHelper.accessor((row) => row.lokalny_patriota, {
        id: 'lokalny_patriota',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Lokalny Patriota', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nie_target, {
        id: 'nie_target',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Target', canSort: false }),
    }),
    columnHelper.accessor((row) => row.niezainteresowani, {
        id: 'niezainteresowani',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Niezainteresowani', canSort: false }),
    }),
    columnHelper.accessor((row) => row.tylko_leasing, {
        id: 'tylko_leasing',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Tylko Leasing', canSort: false }),
    }),
]

const table2 = useVueTable({
    columns: columns2,
    get data() {
        return data.value?.campaignSummary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})

const columns3 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.zrezygnowali, {
        id: 'zrezygnowali',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Zrezygnowali', canSort: false }),
    }),
    columnHelper.accessor((row) => row.inne, {
        id: 'inne',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Inne', canSort: false }),
    }),
]

const table3 = useVueTable({
    columns: columns3,
    get data() {
        return data.value?.campaignSummary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
    <div :class="cls.campaignTables">
        <h2 :class="cls.headerTitle">Kampania: {{ campaign.title }}</h2>
        <div>
            <div>
                <h4 :class="cls.tableheader">Tabela główna</h4>
                <table :class="cls.CampaignTable">
                    <thead :class="cls.header">
                        <tr>
                            <th
                                :class="cls.headerTitle"
                                v-for="header in table1.getFlatHeaders()"
                                :key="header.id"
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
                            v-for="(row, index) in table1.getRowModel().rows"
                            :key="row.id"
                            :class="[
                                cls.row,
                                { [cls.marked]: index % 2 === 0 },
                            ]"
                        >
                            <td
                                v-for="cell in row.getVisibleCells()"
                                :key="cell.id"
                                :class="[
                                    cls.bodyValue,
                                    getColorClass(
                                        cell.column.id,
                                        cell.getValue(),
                                    ),
                                ]"
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
        </div>
        <div class="tableSpacing"></div>
        <div class="tableWrapper">
            <div class="scrollable-table">
                <h4 :class="cls.tableheader">Tabela negatywni</h4>
                <table :class="cls.CampaignTable">
                    <thead :class="cls.header">
                        <tr>
                            <th
                                :class="cls.headerTitle"
                                v-for="header in table2.getFlatHeaders()"
                                :key="header.id"
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
                            v-for="(row, index) in table2.getRowModel().rows"
                            :key="row.id"
                            :class="[
                                cls.row,
                                { [cls.marked]: index % 2 === 0 },
                            ]"
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
        </div>

        <div class="tableSpacing"></div>
        <div class="tableWrapper">
            <div class="scrollable-table">
                <h4 :class="cls.tableheader">Tabela inne</h4>
                <table :class="cls.CampaignTable">
                    <thead :class="cls.header">
                        <tr>
                            <th
                                :class="cls.headerTitle"
                                v-for="header in table3.getFlatHeaders()"
                                :key="header.id"
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
                            v-for="(row, index) in table3.getRowModel().rows"
                            :key="row.id"
                            :class="[
                                cls.row,
                                { [cls.marked]: index % 2 === 0 },
                            ]"
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
        </div>

        <div
            v-if="!data && !isLoading"
            class="noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>

        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
    </div>
</template>
