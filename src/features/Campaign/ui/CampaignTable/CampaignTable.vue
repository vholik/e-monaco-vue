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
        return cls.pastelGreyBackground
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
                return cls.lightestGreenBackground
            case 'przerobiono':
                return cls.lighterGreenBackground
            case 'nowyKlient':
                return cls.darkestGreenBackground
            case 'nadajeSie':
                return cls.mediumGreenBackground
            case 'nieOdbiera':
                return cls.creamBackground
            case 'brakKontaktu':
                return cls.pastelYellowBackground
            case 'dzialalnosc':
                return cls.pastelYellowBackground
            case 'odpada':
                return cls.pastelYellowBackground
            case 'nieIstnieje':
                return cls.pastelYellowBackground
            case 'negat':
                return cls.pastelRedBackground
            case 'nieZainteresowani':
                return cls.pastelRedBackground
            case 'nieTarget':
                return cls.pastelYellowBackground
            case 'tylkoLeasing':
                return cls.pastelYellowBackground
            case 'nastepnaKampania':
                return cls.pastelPurpleBackground
            case 'malaOszczednosc':
                return cls.pastelBlueBackground
            case 'lokalnyPatriota':
                return cls.pastelRedBackground
            case 'wTrakcieRozmow':
                return cls.mediumGreenBackground
            case 'wTrakcieProcesowania':
                return cls.darkerGreenBackground

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
    columnHelper.accessor((row) => row.suma, {
        id: 'suma',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Suma', canSort: false }),
    }),
    columnHelper.accessor((row) => row.pozostalo, {
        id: 'pozostalo',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Pozostało', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nieOdbiera, {
        id: 'nieOdbiera',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Odbiera', canSort: false }),
    }),
    columnHelper.accessor((row) => row.przerobiono, {
        id: 'przerobiono',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Przerobiono', canSort: false }),
    }),
    columnHelper.accessor((row) => row.malaOszczednosc, {
        id: 'malaOszczednosc',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Mała oszczędność', canSort: false }),
    }),
    columnHelper.accessor((row) => row.odpada, {
        id: 'odpada',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Odpada', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nadajeSie, {
        id: 'nadajeSie',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nadaje się', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nastepnaKampania, {
        id: 'nastepnaKampania',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Następna Kampania', canSort: false }),
    }),
    columnHelper.accessor((row) => row.negat, {
        id: 'negat',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Negat', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nowyKlient, {
        id: 'nowyKlient',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nowy Klient', canSort: false }),
    }),
]

const table1 = useVueTable({
    columns: columns1,
    get data() {
        return data.value?.summary ?? []
    },
    getCoreRowModel: getCoreRowModel(),
})

const columns2 = [
    columnHelper.accessor((row) => row.owner?.firstName, {
        id: 'owner.firstName',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Użytkownik', canSort: false }),
    }),
    columnHelper.accessor((row) => row.brakKontaktu, {
        id: 'brakKontaktu',
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
    columnHelper.accessor((row) => row.nieIstnieje, {
        id: 'nieIstnieje',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Istnieje', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nieTarget, {
        id: 'nieTarget',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Nie Target', canSort: false }),
    }),
    columnHelper.accessor((row) => row.tylkoLeasing, {
        id: 'tylkoLeasing',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () => h(SortHeader, { name: 'Tylko Leasing', canSort: false }),
    }),
    columnHelper.accessor((row) => row.nieZainteresowani, {
        id: 'nieZainteresowani',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Nie Zainteresowani', canSort: false }),
    }),
    columnHelper.accessor((row) => row.lokalnyPatriota, {
        id: 'lokalnyPatriota',
        cell: (info) =>
            h('span', { class: cls.boldText }, info.getValue() ?? 'N/A'),
        header: () =>
            h(SortHeader, { name: 'Lokalny Patriota', canSort: false }),
    }),
]

const table2 = useVueTable({
    columns: columns2,
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
                <h4 :class="cls.tableheader">Odpada i Negat</h4>
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

        <div class="tableSpacing"></div>

        <div
            v-if="!data && !isLoading"
            class="noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
    </div>
</template>
