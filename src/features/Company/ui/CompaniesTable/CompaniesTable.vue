<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref } from 'vue'
import cls from './CompaniesTable.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { StatusSelect } from '@/entities/Status'
import { UserSelect, useUserStore } from '@/entities/User'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import { useCompanies } from '../../model/services/useCompanies'
import type { Company } from '@/entities/Company'
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
    DateFilter,
} from '@/features/CompanyFilter'
import { StatusFilter } from '@/features/CompanyFilter'
import CompaniesPagination from '../CompaniesPagination/CompaniesPagination.vue'
import type { Order } from '@/shared/types/order'
import { storeToRefs } from 'pinia'
import NipInput from '@/shared/ui/NipInput/NipInput.vue'
import CompanyFreeSelect from '@/features/CompanyFreeSelect/ui/CompanyFreeSelect.vue'
import TextBlock from '@/shared/ui/TextBlock/TextBlock.vue'
import { useSidebarStore } from '@/widgets/Sidebar/model/store/sidebarStore'

const companyFilterStore = useCompanyFilterStore()
const { data, isLoading, isFetching, refetch } = useCompanies()
const toast = useToast()
const { onDataChange } = useCompanyActions()
const isCompanyHistoriesModalOpen = ref(false)
const currentCompanyId = ref('')
const userStore = useUserStore()
const { loggedInUser } = storeToRefs(userStore)
const { tables } = storeToRefs(companyFilterStore)

function onContactHistoriesClick(companyId: string) {
    isCompanyHistoriesModalOpen.value = true
    currentCompanyId.value = companyId
}

function changeOrder(name: string) {
    return (value: Order) => {
        companyFilterStore.setOrder(value)
        companyFilterStore.setOrderBy(name)
    }
}

function isSortHeaderLoading(name: string) {
    return companyFilterStore.getOrderBy === name && isFetching.value
}
const sidebarStore = useSidebarStore()
const { screwed: screwedSidebar } = storeToRefs(sidebarStore)

const columnHelper = createColumnHelper<Company>()

const isAdmin = ref(loggedInUser.value?.role !== 'user')

const columns = ref([
    columnHelper.accessor((row) => row.id, {
        id: '#id',
        cell: (info) => {
            const startPoint =
                (companyFilterStore.page - 1) * companyFilterStore.take

            const index = info.row.index + 1 + startPoint

            return h(
                Text,
                { color: 'secondary', size: 'size_s' },
                { default: () => index.toString() },
            )
        },
        header: () => {
            return h(SortHeader, {
                name: '#',
                canSort: false,
            })
        },
    }),
    columnHelper.accessor((row) => row.nextContactDate, {
        id: 'nextContactDate',
        cell: (info) => {
            return h(Datepicker, {
                key: info.row.original.id,
                name: 'nextContactDate',
                width: '110px',
                placeholder: 'Wybierz datę',
                onChange: onDataChange(info.row.original.id, 'nextContactDate'),
                defaultValue: info.row.original.nextContactDate,
            })
        },
        header: () => {
            const key = 'company.nextContactDate'
            return h(SortHeader, {
                name: 'Nast. kontakt',
                filter: DateFilter,
                value:
                    companyFilterStore.getOrderBy === key
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder(key),
                loading: isSortHeaderLoading(key),
            })
        },
    }),
    columnHelper.accessor((row) => row.contactHistories, {
        id: 'contactHistories',
        cell: (info) =>
            h(
                ActionLink,
                {
                    key: info.row.original.id,
                    onClickFn: () =>
                        onContactHistoriesClick(info.row.original.id),
                },
                {
                    default: () => '📖',
                },
            ),
        header: () => {
            const key = 'last_contact_date'
            return h(SortHeader, {
                name: 'His',
                value:
                    companyFilterStore.getOrderBy === key
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder(key),
                loading: isSortHeaderLoading(key),
            })
        },
    }),
    columnHelper.accessor((row) => row.owner, {
        id: 'owner',
        cell: (info) =>
            h(UserSelect, {
                key: info.row.original.id,
                name: 'owner',
                defaultValue: info.row.original.owner?.id,
                onUpdate: onDataChange(info.row.original.id, 'ownerId'),
            }),
        header: () => {
            return h(SortHeader, {
                name: 'U',
                filter: UserFilter,
                onUpdate: changeOrder('owner.firstName'),
                value:
                    companyFilterStore.getOrderBy === 'owner.firstName'
                        ? companyFilterStore.getOrder
                        : null,
            })
        },
    }),
    columnHelper.accessor((row) => row.last_contact_comment, {
        id: 'comment',
        cell: (info) =>
            h(
                TextBlock,
                {
                    key: info.row.original.id,
                },
                {
                    default: () => info.getValue(),
                },
            ),
        header: () => {
            return h(SortHeader, {
                name: 'Komentarz',
                canSort: false,
            })
        },
    }),
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) =>
            h(CommentInput, {
                key: info.row.original.id,
                onUpdate: onDataChange(info.row.original.id, 'name'),
                defaultValue: info.getValue(),
                placeholder: 'Firma XYZ',
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Nazwa firmy',
                value:
                    companyFilterStore.getOrderBy === 'company.name'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('company.name'),
                filter: h(CompanyFreeSelect, {
                    column: 'name',
                }),
                loading: isSortHeaderLoading('company.name'),
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
                    companyFilterStore.getOrderBy === 'supply'
                        ? companyFilterStore.getOrder
                        : null,
                onUpdate: changeOrder('supply'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'frugality',
        cell: (info) => `${info.row.original.frugality} zł`,
        header: () => {
            return h(SortHeader, {
                name: 'Oszcz',
                onUpdate: changeOrder('frugality'),
                value:
                    companyFilterStore.getOrderBy === 'frugality'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('frugality'),
            })
        },
    }),
    columnHelper.accessor((row) => row.status, {
        id: 'status',
        cell: (info) => {
            return h(StatusSelect, {
                name: 'status',
                key: info.row.original.id,
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
                loading: isSortHeaderLoading('company.status'),
            })
        },
    }),
    columnHelper.accessor((row) => row.municipality, {
        id: 'municipality',
        cell: (info) =>
            h(MunicipalitySelect, {
                name: 'municipality',
                key: info.row.original.id,
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
                loading: isSortHeaderLoading('municipality.name'),
            })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'taxincrease',
        cell: (info) => `${info.row.original.taxincrease ?? 'N/A'} zł`,
        header: () => {
            return h(SortHeader, {
                name: 'Wzrost',
                onUpdate: changeOrder('taxincrease'),
                value:
                    companyFilterStore.getOrderBy === 'taxincrease'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('taxincrease'),
            })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'kitrate',
        cell: (info) => `${info.row.original.kitrate ?? 'N/A'} zł`,
        header: () => {
            return h(SortHeader, {
                name: 'Zestaw',
                onUpdate: changeOrder('kitrate'),
                value:
                    companyFilterStore.getOrderBy === 'kitrate'
                        ? companyFilterStore.getOrder
                        : null,

                loading: isSortHeaderLoading('kitrate'),
            })
        },
    }),
    columnHelper.accessor((row) => row, {
        id: 'year',
        cell: (info) => `${info.row.original?.year ?? 'N/A'}`,
        header: () => {
            return h(SortHeader, {
                name: 'Rok',
                onUpdate: changeOrder('year'),
                value:
                    companyFilterStore.getOrderBy === 'year'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('year'),
            })
        },
    }),
    columnHelper.accessor((row) => row.full_name, {
        id: 'fullName',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, {
                name: 'Imię i nazwisko',
                onUpdate: changeOrder('full_name'),
                value:
                    companyFilterStore.getOrderBy === 'full_name'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('full_name'),
            })
        },
    }),

    columnHelper.accessor((row) => row.role, {
        id: 'role',
        cell: (info) =>
            h(
                TextBlock,
                {
                    key: info.row.original.id,
                },
                {
                    default: () => info.getValue(),
                },
            ),

        header: () => {
            return h(SortHeader, {
                name: 'Rola',
                onUpdate: changeOrder('role'),
                value:
                    companyFilterStore.getOrderBy === 'role'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('role'),
            })
        },
    }),
    columnHelper.accessor((row) => row.phone, {
        id: 'phone',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, {
                name: 'Telefon',
                onUpdate: changeOrder('phone'),
                value:
                    companyFilterStore.getOrderBy === 'phone'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('phone'),
            })
        },
    }),
    columnHelper.accessor((row) => row.email, {
        id: 'email',
        cell: (info) => info.getValue(),
        header: () => {
            return h(SortHeader, {
                name: 'E-mail',
                onUpdate: changeOrder('email'),
                value:
                    companyFilterStore.getOrderBy === 'email'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('email'),
            })
        },
    }),
    columnHelper.accessor((row) => row.nip, {
        id: 'nip',
        cell: (info) =>
            h(NipInput, {
                placeholder: '123-456-78-90',
                onUpdate: onDataChange(info.row.original.id, 'nip'),
                key: info.row.original.id,
                defaultValue: info.getValue(),
                validateFn: (value: string) => {
                    const isValid = validateNip(value)
                    if (!isValid) {
                        toast.error('Niepoprawny NIP')
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
                filter: h(CompanyFreeSelect, {
                    column: 'nip',
                }),
                loading: isSortHeaderLoading('company.nip'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'activation',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(
                    info.row.original.id,
                    'company.activation',
                ),
                key: info.row.original.id,
                defaultValue: info.row.original.activation,
                withPrice: true,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Aktywacja',
                onUpdate: changeOrder('company.activation'),
                value:
                    companyFilterStore.getOrderBy === 'company.activation'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('company.activation'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'rentalFee',
        cell: (info) =>
            h(PriceInput, {
                onUpdate: onDataChange(
                    info.row.original.id,
                    'company.rentalFee',
                ),
                key: info.row.original.id,
                defaultValue: info.row.original.rentalFee,
                withPrice: true,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Czynsz',
                onUpdate: changeOrder('company.rentalFee'),
                value:
                    companyFilterStore.getOrderBy === 'company.rentalFee'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('company.rentalFee'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'statement',
        cell: (info) =>
            h(PriceInput, {
                key: info.row.original.id,
                onUpdate: onDataChange(info.row.original.id, 'statement'),
                defaultValue: info.row.original.statement,
                withPrice: true,
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Deklaracja',
                onUpdate: changeOrder('company.statement'),
                value:
                    companyFilterStore.getOrderBy === 'company.statement'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('company.statement'),
            })
        },
    }),
    columnHelper.accessor((row) => row.tractor, {
        id: 'tractor',
        cell: (info) => `${info.row.original?.tractor ?? 'N/A'} zł`,
        header: () => {
            return h(SortHeader, {
                name: 'Stawka ciągnik',
                onUpdate: changeOrder('tractor'),
                value:
                    companyFilterStore.getOrderBy === 'tractor'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('tractor'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailer, {
        id: 'trailer',
        cell: (info) => `${info.row.original?.trailer ?? 'N/A'} zł`,
        header: () => {
            return h(SortHeader, {
                name: 'Stawka naczepa',
                onUpdate: changeOrder('trailer'),
                value:
                    companyFilterStore.getOrderBy === 'trailer'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('trailer'),
            })
        },
    }),
    columnHelper.accessor((row) => row?.trailerAmount, {
        id: 'theirsTaxes',
        cell: (info) =>
            info.row.original.theirstaxes
                ? `${info.row.original.theirstaxes} zł`
                : 'N/A',
        header: () => {
            return h(SortHeader, {
                name: 'Podatek u nich',
                onUpdate: changeOrder('theirstaxes'),
                value:
                    companyFilterStore.getOrderBy === 'theirstaxes'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('theirstaxes'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'ourTaxes',
        cell: (info) =>
            info.row.original.ourtaxes
                ? `${info.row.original.ourtaxes} zł`
                : 'N/A',
        header: () => {
            return h(SortHeader, {
                name: 'Podatek u nas',
                onUpdate: changeOrder('ourtaxes'),
                value:
                    companyFilterStore.getOrderBy === 'ourtaxes'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('ourtaxes'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'tractorAmount',
        cell: (info) =>
            h(PriceInput, {
                key: info.row.original.id,
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
                loading: isSortHeaderLoading('company.tractorAmount'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'trailerAmount',
        cell: (info) =>
            h(PriceInput, {
                key: info.row.original.id,
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
                loading: isSortHeaderLoading('company.trailerAmount'),
            })
        },
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'otherAmount',
        cell: (info) =>
            h(PriceInput, {
                key: info.row.original.id,
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
                loading: isSortHeaderLoading('company.otherAmount'),
            })
        },
    }),
    columnHelper.accessor((row) => row.contactPersons, {
        id: 'contactPersons',
        cell: (info) =>
            h(ContactPersonSelect, {
                key: info.row.original.id,
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
                canSort: false,
            })
        },
    }),
])

const table = useVueTable({
    get columns() {
        return columns.value
    },
    get data() {
        return data.value?.companies || []
    },
    state: {
        get columnVisibility() {
            return columns.value.reduce((acc, it) => {
                if (it.id === 'owner') {
                    if (isAdmin.value) {
                        acc[it.id] = true
                    } else {
                        acc[it.id] = false
                    }
                    return acc
                }
                if (tables.value?.includes(it.id)) {
                    acc[it.id] = true
                } else {
                    acc[it.id] = false
                }

                return acc
            }, {})
        },
    },
    getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
    <div
        :class="[
            cls.tableWrapper,
            {
                [cls.screwed]: screwedSidebar,
            },
        ]"
    >
        <CompanyHistoriesModal
            v-model:isModalOpen="isCompanyHistoriesModalOpen"
            :current-company-id="currentCompanyId"
            :refetch="refetch"
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
                            :key="cell.id"
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
