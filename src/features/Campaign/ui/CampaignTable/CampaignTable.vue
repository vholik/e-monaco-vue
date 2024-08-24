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

const getColorClass = (columnId: string, tableName?: string) => {
    if (columnId === 'suma') {
        return ''
    }

    if (tableName === 'Użytkownik') {
        return cls.noBackground
    } else if (tableName === 'Negatywni') {
        if (columnId === 'owner.firstName') {
            return cls.noBackground
        }
        return cls.redBackground
    } else if (tableName === 'Suma') {
        if (columnId === 'owner.firstName') {
            return cls.noBackground
        }
        return cls.blueBackground
    } else {
        switch (columnId) {
            case 'pozostalo':
                return cls.beigeBackground
            case 'przerobiono':
                return cls.noBackground
            case 'nowy_klient':
                return cls.greenBackground
            case 'szansa':
                return cls.limeBackground
            case 'naPozniej':
                return cls.blueBackground
            case 'nie_odbiera':
                return cls.darkGreyBackground
            case 'brakKontaktu':
                return cls.redBackground
            case 'dzialalnosc':
                return cls.redBackground
            case 'lokalnyPatriota':
                return cls.redBackground
            case 'nieIstnieje':
                return cls.redBackground
            case 'Negat':
                return cls.redBackground
            case 'nieZainteresowani':
                return cls.redBackground
            case 'nieTarget':
                return cls.redBackground
            case 'tylkoLeasing':
                return cls.redBackground
            case 'Nastepna Kampania':
                return cls.blueBackground
            case 'Mała Oszczędność':
                return cls.blueBackground
            case 'rozmowy':
                return cls.yellowBackground
            case 'lokalny_patriota':
                return cls.redBackground
            case 'inne':
                return cls.whiteBackground
            default:
                return ''
        }
    }
}

///////////////// tabela 1
const columns1 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),

    columnHelper.accessor((row) => row.przerobiono, {
        id: 'przerobiono',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Przerobiono', canSort: false }),
    }),
    columnHelper.accessor((row) => row.pozostalo, {
        id: 'pozostalo',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Pozostało', canSort: false }),
    }),
    columnHelper.accessor((row) => row.naPozniej, {
        id: 'naPozniej',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Na później', canSort: false }),
    }),
    columnHelper.accessor((row) => row.negat, {
        id: 'Negat',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Negat', canSort: false }),
    }),
    columnHelper.accessor((row) => row.wTrakcie, {
        id: 'rozmowy',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'W Trakcie', canSort: false }),
    }),
    columnHelper.accessor((row) => row.szansa, {
        id: 'szansa',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Szansa', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nowyKlient, {
        id: 'nowy_klient',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nowy Klient', canSort: false }),
    }),
    columnHelper.accessor((row) => row.suma, {
        id: 'suma_leadow',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Suma', canSort: false }),
    }),
]
const table1 = useVueTable({
    columns: columns1,
    get data() {
        return data.value?.summary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})

///////////////// tabela 2
const columns2 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.brakKontaktu, {
        id: 'mala_oszczednosc',
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
    columnHelper.accessor((row) => row.lokalnyPatriota, {
        id: 'lokalny_patriota',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Lokalny Patriota', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nieIstnieje, {
        id: 'nie_istnieje',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Istnieje', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nieZainteresowani, {
        id: 'nie_zainteresowani',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Nie Zainteresowani', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nieTarget, {
        id: 'nie_target',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Target', canSort: false }),
    }),
    columnHelper.accessor((row) => row.tylkoLeasing, {
        id: 'tylko_leasing',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Tylko Leasing', canSort: false }),
    }),
    columnHelper.accessor((row) => row.suma, {
        id: 'suma',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Suma', canSort: false }),
    }),
]
const table2 = useVueTable({
    columns: columns2,
    get data() {
        return data.value?.summary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})

///////////////// tabela 3
const columns3 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.malaOszczednosc, {
        id: 'Mała Oszczędność',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Mała Oszczędność', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nastepnaKampania, {
        id: 'Nastepna Kampania',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Następna Kampania', canSort: false }),
    }),
    columnHelper.accessor((row) => row.zrezygnowali, {
        id: 'zrezygnowali',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Zrezygnowali', canSort: false }),
    }),
    columnHelper.accessor((row) => row.suma, {
        id: 'suma_leadow',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Suma', canSort: false }),
    }),
]

const table3 = useVueTable({
    columns: columns3,
    get data() {
        return data.value?.summary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
    <div :class="cls.campaignTables">
        <h2 :class="cls.headerTitle">Kampania: {{ campaign.title }}</h2>
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
                    :class="[cls.row, { [cls.marked]: index % 2 === 0 }]"
                >
                    <td
                        v-for="cell in row.getVisibleCells()"
                        :key="cell.id"
                        :class="[cls.bodyValue, getColorClass(cell.column.id)]"
                    >
                        <FlexRender
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="tableSpacing"></div>

        <div class="tableWrapper">
            <div class="scrollable-table">
                <h4 :class="cls.tableheader">Negatywni</h4>
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
                                :class="[
                                    cls.bodyValue,
                                    getColorClass(cell.column.id, 'Negatywni'),
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
                <h4 :class="cls.tableheader">Pozostałe</h4>
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
                                :class="[
                                    cls.bodyValue,
                                    getColorClass(cell.column.id),
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

        <div
            v-if="!data && !isLoading"
            class="noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>

        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
    </div>
</template>
