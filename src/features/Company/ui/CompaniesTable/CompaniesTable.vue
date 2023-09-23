<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import cls from './CompaniesTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { StatusSelect } from '@/entities/Status'
import { UserSelect } from '@/entities/User'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import { useCompanies } from '../../model/services/useCompanies'
import type { Company } from '@/entities/Company'
import { watch } from 'vue'
import Datepicker from '@/shared/ui/Datepicker/Datepicker.vue'
import CommentInput from '@/shared/ui/CommentInput/CommentInput.vue'
import { useCompanyActions } from '../../model/lib/useCompanyActions'
import { MunicipalitySelect } from '@/entities/Municipality'
import { validateNip } from '@/shared/lib/nip'
import { useToast } from 'vue-toastification'
import ActionLink from '@/shared/ui/ActionLink/ActionLink.vue'
import CompanyHistoriesModal from '../CompanyHistoriesModal/CompanyHistoriesModal.vue'
import LoaderContainer from '@/shared/ui/LoaderContainer/LoaderContainer.vue'

const { data, isLoading } = useCompanies()
const toast = useToast()
const companiesData = ref({ count: 0, companies: [] as Company[] })
const { onDataChange } = useCompanyActions()
const isCompanyHistoriesModalOpen = ref(false)
const currentCompanyId = ref('')

function onContactHistoriesClick(companyId: string) {
    isCompanyHistoriesModalOpen.value = true
    currentCompanyId.value = companyId
}

function calculatePairArguments(...args: (number | undefined)[]) {
    for (let arg of args) {
        if (arg === undefined) {
            return 'N/A'
        }
    }

    let count = 0
    let i = 0

    while (i < args.length - 1) {
        count += args[i]! * args[i + 1]!
        i += 2
    }
    return count
}

const columnHelper = createColumnHelper<Company>()
const columns: any[] = [
    columnHelper.accessor((row) => row.nextContactDate, {
        id: 'nextContactDate',
        cell: (info) =>
            h(Datepicker, {
                name: 'nextContactDate',
                width: '160px',
                placeholder: 'Wybierz datę',
                onChangeFn: onDataChange(
                    info.row.original.id,
                    'nextContactDate',
                ),
                defaultValue: info.getValue(),
            }),
        header: () => {
            return h(SortHeader, { name: 'Nast. kontakt', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.contactHistories, {
        id: 'contactHistories',
        cell: (info) =>
            h(
                ActionLink,
                {
                    onClickFn: () =>
                        onContactHistoriesClick(info.row.original.id),
                },
                {
                    default: () => 'Kliknij aby zobaczyć',
                },
            ),
        header: () => {
            return h(SortHeader, {
                name: 'Historia kóntaktów',
                value: 'cool',
                canSort: false,
            })
        },
    }),
    columnHelper.accessor((row) => row.owner, {
        id: 'owner',
        cell: (info) =>
            h(UserSelect, {
                name: 'owner',
                defaultValue: info.getValue().id,
                onChangeFn: onDataChange(info.row.original.id, 'ownerId'),
            }),
        header: () => {
            return h(SortHeader, { name: 'Właściciel', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.comment, {
        id: 'comment',
        cell: (info) =>
            h(CommentInput, {
                onChangeFn: onDataChange(info.row.original.id, 'comment'),
                defaultValue: info.getValue(),
                placeholder: 'Pole tekstowe',
            }),
        header: () => {
            return h(SortHeader, { name: 'Komentarz', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.nip, {
        id: 'nip',
        cell: (info) =>
            h(CommentInput, {
                placeholder: '123-456-78-90',
                onChangeFn: onDataChange(info.row.original.id, 'nip'),
                defaultValue: info.getValue(),
                validateFn: (value: string) => {
                    const isValid = validateNip(value)
                    if (!isValid) {
                        toast.error('Nie poprawny NIP')
                        return isValid
                    }
                    return isValid
                },
            }),
        header: () => {
            return h(SortHeader, { name: 'NIP', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) =>
            h(CommentInput, {
                onChangeFn: onDataChange(info.row.original.id, 'name'),
                defaultValue: info.getValue(),
                placeholder: 'Firma XYZ',
            }),
        header: () => {
            return h(SortHeader, { name: 'Naszwa firmy', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.status, {
        id: 'status',
        cell: (info) => {
            return h(StatusSelect, {
                name: 'status',
                defaultValue: info.row.original.status,
                onChangeFn: onDataChange(info.row.original.id, 'status'),
            })
        },
        header: () => {
            return h(SortHeader, { name: 'Status', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.municipality, {
        id: 'manicipality',
        cell: (info) =>
            h(MunicipalitySelect, {
                name: 'municipality',
                defaultValue: info.getValue().id,
                onChangeFn: onDataChange(
                    info.row.original.id,
                    'municipalityId',
                ),
            }),
        header: () => {
            return h(SortHeader, { name: 'Gmina', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'taxIncrease',
        cell: (info) => info.row.original.municipality.taxIncrease,
        header: () => {
            return h(SortHeader, { name: 'Wzrost podatku', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'kitRate',
        cell: (info) => info.row.original.municipality.kitRate,
        header: () => {
            return h(SortHeader, { name: 'Zestaw', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'supply',
        cell: (info) =>
            info.row.original.municipality.tractorRate +
            info.row.original.municipality.trailerRate +
            info.row.original.municipality.otherRate,
        header: () => {
            return h(SortHeader, { name: 'Tabor', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'tractorRate',
        cell: (info) => info.row.original.municipality.tractorRate,
        header: () => {
            return h(SortHeader, { name: 'Stawka ciągnik', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'trailerRate',
        cell: (info) => info.row.original.municipality.trailerRate,
        header: () => {
            return h(SortHeader, { name: 'Stawka naczepa', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'theirsTaxes',
        // STAWKA CIAGNIK x CIAGNIKI + STAWKA NACZEPA x NACZEPY + 1800 x INNE
        cell: (info) =>
            calculatePairArguments(
                info.row.original.tractorAmount,
                info.row.original.municipality.tractorRate,
                info.row.original.trailerAmount,
                info.row.original.municipality.trailerRate,
                1800,
                info.row.original.otherAmount,
            ),
        header: () => {
            return h(SortHeader, { name: 'Podatek u nich', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'ourTaxes',
        // 1457 x CIAGNIKI + 972 x NACZEPY + 1000 x INNE
        cell: (info) =>
            calculatePairArguments(
                1457,
                info.row.original.tractorAmount,
                972,
                info.row.original.trailerAmount,
                1000,
                info.row.original.otherAmount,
            ),
        header: () => {
            return h(SortHeader, { name: 'Podatek u nas', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'frugality',
        cell: (info) => {
            const arg1 = calculatePairArguments(
                info.row.original.tractorAmount,
                info.row.original.municipality.tractorRate,
                info.row.original.trailerAmount,
                info.row.original.municipality.trailerRate,
            )
            const arg2 = calculatePairArguments(
                1800,
                info.row.original.otherAmount,
            )
            const arg3 = calculatePairArguments(
                1457,
                info.row.original.tractorAmount,
                972,
                info.row.original.trailerAmount,
                1000,
                info.row.original.otherAmount,
            )
            if (
                typeof arg1 === 'number' &&
                typeof arg2 === 'number' &&
                typeof arg3 === 'number'
            ) {
                return arg1 + arg2 - arg3
            }
            return 'N/A'
        },
        header: () => {
            return h(SortHeader, { name: 'Oszczędność', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'activation',
        cell: (info) =>
            h(PriceInput, {
                onChangeFn: onDataChange(info.row.original.id, 'activation'),
                defaultValue: info.getValue(),
            }),
        header: () => {
            return h(SortHeader, { name: 'Aktywacja', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'rentalFee',
        cell: (info) =>
            h(PriceInput, {
                onChangeFn: onDataChange(info.row.original.id, 'rent'),
                defaultValue: info.getValue(),
            }),
        header: () => {
            return h(SortHeader, { name: 'Czyńsz', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'statement',
        cell: (info) =>
            h(PriceInput, {
                onChangeFn: onDataChange(info.row.original.id, 'declaration'),
                defaultValue: info.getValue(),
            }),
        header: () => {
            return h(SortHeader, { name: 'Deklaracja', value: 'cool' })
        },
    }),
    columnHelper.accessor((row) => row.contactPersons, {
        id: 'contactPersons',
        cell: (info) =>
            h(ContactPersonSelect, {
                name: 'contactPersons',
                defaultValue: info.getValue().map((it) => it.id),
                onChangeFn: onDataChange(
                    info.row.original.id,
                    'contactPersonsIds',
                ),
            }),
        header: () => {
            return h(SortHeader, { name: 'Osoby kontaktowe', value: 'cool' })
        },
    }),
]

const table = useVueTable({
    columns,
    get data() {
        return companiesData.value.companies || []
    },
    getCoreRowModel: getCoreRowModel(),
})

watch(data, (newData: { count: number; companies: Company[] }) => {
    companiesData.value = newData
    table.setPageSize(newData.count)
})
</script>

<template>
    <div :class="cls.tableWrapper">
        <CompanyHistoriesModal
            v-model:isModalOpen="isCompanyHistoriesModalOpen"
            :current-company-id="currentCompanyId"
        />
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
                </tr>
            </tbody>
        </table>
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
    </div>
</template>
