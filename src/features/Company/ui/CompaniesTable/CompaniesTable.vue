<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import cls from './CompaniesTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { StatusSelect } from '@/entities/Status'
import { UserSelect, useUserStore, type User } from '@/entities/User'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import {
    useCompanies,
    type CompaniesData,
} from '../../model/services/useCompanies'
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
import Text from '@/shared/ui/Text/Text.vue'
import {
    MunicipalitiesFilter,
    UserFilter,
    useCompanyFilterStore,
} from '@/features/CompanyFilter'
import { StatusFilter } from '@/features/CompanyFilter'
import { ContactPersonsFilter } from '@/features/CompanyFilter'
import CompaniesPagination from '../CompaniesPagination/CompaniesPagination.vue'
import type { Order } from '@/shared/types/order'
import { storeToRefs } from 'pinia'
import NipInput from '@/shared/ui/NipInput/NipInput.vue'

const companyFilterStore = useCompanyFilterStore()
const { data, isLoading } = useCompanies()
const toast = useToast()
const { onDataChange } = useCompanyActions()
const isCompanyHistoriesModalOpen = ref(false)
const currentCompanyId = ref('')
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

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

function changeOrder(name: string) {
    return (value: Order) => {
        companyFilterStore.setOrder(value)
        companyFilterStore.setOrderBy(name)
    }
}

const columnHelper = createColumnHelper<Company>()
const columns = [
    columnHelper.accessor((row) => row.nextContactDate, {
        id: 'nextContactDate',
        cell: (info) =>
            h(Datepicker, {
                name: 'nextContactDate',
                width: '160px',
                placeholder: 'Wybierz datę',
                onChange: onDataChange(info.row.original.id, 'nextContactDate'),
                defaultValue: info.getValue(),
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Nast. kontakt',
                value:
                    companyFilterStore.getOrderBy === 'company.nextContactDate'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.nextContactDate'),
            })
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
                value:
                    companyFilterStore.getOrderBy ===
                    'contactHistories.contactDate'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('contactHistories.contactDate'),
            })
        },
    }),

    columnHelper.accessor((row) => row.comment, {
        id: 'comment',
        cell: (info) =>
            h(CommentInput, {
                onUpdate: onDataChange(info.row.original.id, 'comment'),
                defaultValue: info.getValue(),
                placeholder: 'Pole tekstowe',
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Komentarz',
                value:
                    companyFilterStore.getOrderBy === 'company.comment'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.comment'),
            })
        },
    }),
    columnHelper.accessor((row) => row.nip, {
        id: 'nip',
        cell: (info) =>
            h(NipInput, {
                placeholder: '123-456-78-90',
                onUpdate: onDataChange(info.row.original.id, 'nip'),
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
            return h(SortHeader, {
                name: 'NIP',
                value:
                    companyFilterStore.getOrderBy === 'company.nip'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.nip'),
            })
        },
    }),
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) =>
            h(CommentInput, {
                onUpdate: onDataChange(info.row.original.id, 'name'),
                defaultValue: info.getValue(),
                placeholder: 'Firma XYZ',
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Naszwa firmy',
                value:
                    companyFilterStore.getOrderBy === 'company.name'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.name'),
            })
        },
    }),
    columnHelper.accessor((row) => row.status, {
        id: 'status',
        cell: (info) => {
            return h(StatusSelect, {
                name: 'status',
                defaultValue: info.row.original.status,
                onUpdate: onDataChange(info.row.original.id, 'status'),
            })
        },
        header: () => {
            return h(SortHeader, {
                name: 'Status',
                filter: StatusFilter,
                value:
                    companyFilterStore.getOrderBy === 'company.status'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.status'),
            })
        },
    }),
    columnHelper.accessor((row) => row.municipality, {
        id: 'manicipality',
        cell: (info) =>
            h(MunicipalitySelect, {
                name: 'municipality',
                defaultValue: info.row.original.municipality?.id,
                onUpdate: onDataChange(info.row.original.id, 'municipalityId'),
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Gmina',
                filter: MunicipalitiesFilter,
                value:
                    companyFilterStore.getOrderBy === 'municipality.name'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('municipality.name'),
            })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'taxIncrease',
        cell: (info) => info.row.original.municipality?.taxIncrease,
        header: () => {
            return h(SortHeader, {
                name: 'Wzrost podatku',
                onUpdate: changeOrder('municipality.taxIncrease'),
                value:
                    companyFilterStore.getOrderBy === 'municipality.taxIncrease'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'kitRate',
        cell: (info) => info.row.original.municipality?.kitRate,
        header: () => {
            return h(SortHeader, {
                name: 'Zestaw',
                onUpdate: changeOrder('municipality.kitRate'),
                value:
                    companyFilterStore.getOrderBy === 'municipality.kitRate'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'tractorAmount',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'tractorAmount'),
                defaultValue: info.row.original.tractorAmount,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Ciągniki',
                onUpdate: changeOrder('company.tractorAmount'),
                value:
                    companyFilterStore.getOrderBy === 'company.tractorAmount'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'trailerAmount',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'trailerAmount'),
                defaultValue: info.row.original.trailerAmount,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Naczepy',
                onUpdate: changeOrder('company.trailerAmount'),
                value:
                    companyFilterStore.getOrderBy === 'company.trailerAmount'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'otherAmount',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'otherAmount'),
                defaultValue: info.row.original.otherAmount,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Inne',
                onUpdate: changeOrder('company.otherAmount'),
                value:
                    companyFilterStore.getOrderBy === 'company.otherAmount'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row?.trailerAmount, {
        id: 'supply',
        cell: (info) => info.row.original.supply,
        header: () => {
            return h(SortHeader, {
                name: 'Tabor',
                value:
                    companyFilterStore.getOrderBy === 'company.supply'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.supply'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'tractorRate',
        cell: (info) => info.row.original.municipality?.tractorRate,
        header: () => {
            return h(SortHeader, {
                name: 'Stawka ciągnik',
                onUpdate: changeOrder('municipality.tractorRate'),
                value:
                    companyFilterStore.getOrderBy === 'municipality.tractorRate'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'trailerRate',
        cell: (info) => info.row.original.municipality?.trailerRate,
        header: () => {
            return h(SortHeader, {
                name: 'Stawka naczepa',
                onUpdate: changeOrder('municipality.trailerRate'),
                value:
                    companyFilterStore.getOrderBy === 'municipality.trailerRate'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row?.trailerAmount, {
        id: 'theirsTaxes',
        cell: (info) => info.row.original.theirsTaxes,
        header: () => {
            return h(SortHeader, {
                name: 'Podatek u nich',
                onUpdate: changeOrder('company.theirsTaxes'),
                value:
                    companyFilterStore.getOrderBy === 'company.theirsTaxes'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'ourTaxes',
        cell: (info) => info.row.original.ourTaxes,
        header: () => {
            return h(SortHeader, {
                name: 'Podatek u nas',
                onUpdate: changeOrder('company.ourTaxes'),
                value:
                    companyFilterStore.getOrderBy === 'company.ourTaxes'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'frugality',
        cell: (info) => info.row.original.frugality,
        header: () => {
            return h(SortHeader, {
                name: 'Oszczędność',
                onUpdate: changeOrder('company.frugality'),
                value:
                    companyFilterStore.getOrderBy === 'company.frugality'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'activation',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'activation'),
                defaultValue: info.row.original.activation,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Aktywacja',
                onUpdate: changeOrder('company.activation'),
                value:
                    companyFilterStore.getOrderBy === 'activation'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'rentalFee',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'rentalFee'),
                defaultValue: info.row.original.rentalFee,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Czyńsz',
                onUpdate: changeOrder('company.rentalFee'),
                value:
                    companyFilterStore.getOrderBy === 'company.rentalFee'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'statement',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(info.row.original.id, 'statement'),
                defaultValue: info.row.original.statement,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Deklaracja',
                onUpdate: changeOrder('company.statement'),
                value:
                    companyFilterStore.getOrderBy === 'company.statement'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.contactPersons, {
        id: 'contactPersons',
        cell: (info) =>
            h(ContactPersonSelect, {
                name: 'contactPersons',
                defaultValue: info.row.original.contactPersons.map(
                    (it) => it.id,
                ),
                onUpdate: onDataChange(
                    info.row.original.id,
                    'contactPersonsIds',
                ),
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Osoby kontaktowe',
                onUpdate: changeOrder('contactPersons.firstName'),
                filter: ContactPersonsFilter,
                value:
                    companyFilterStore.getOrderBy === 'contactPersons.firstName'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
]

if (user.value && user.value?.role !== 'user') {
    columns.splice(
        2,
        0,
        // @ts-ignore
        columnHelper.accessor((row) => row.owner, {
            id: 'owner',
            cell: (info) =>
                h(UserSelect, {
                    name: 'owner',
                    defaultValue: info.row.original.owner?.id,
                    onUpdate: onDataChange(info.row.original.id, 'ownerId'),
                }),
            header: () => {
                return h(SortHeader, {
                    name: 'Właściciel',
                    filter: UserFilter,
                    onUpdate: changeOrder('owner.firstName'),
                    value:
                        companyFilterStore.getOrderBy === 'owner.firstName'
                            ? companyFilterStore.getOrder
                            : null,
                })
            },
        }),
    )
}

const table = useVueTable({
    columns,
    get data() {
        return data.value?.companies || []
    },
    getCoreRowModel: getCoreRowModel(),
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
        <div
            v-if="!data?.companies?.length && !isLoading"
            :class="cls.noData"
        >
            <Text color="quinary">Nie znaleziono danych</Text>
        </div>
        <LoaderContainer :is-loading="isLoading"></LoaderContainer>
        <CompaniesPagination :count="data?.count || 0" />
    </div>
</template>
