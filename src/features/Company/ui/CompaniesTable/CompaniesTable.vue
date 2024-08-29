<script setup lang="ts">
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core'
import { FlexRender, useVueTable } from '@tanstack/vue-table'
import { h, ref, watch } from 'vue'
import cls from './CompaniesTable.module.scss'
import propcls from '@/shared/ui/CommentInput/CommentInput.module.scss'
import SortHeader from '@/shared/ui/SortHeader/SortHeader.vue'
import { StatusSelect } from '@/entities/Status'
import { UserSelect, useUserStore } from '@/entities/User'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'
import {
    ContactPersonSelect,
    type ContactPerson,
} from '@/entities/ContactPerson'
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
import CampaignSelect from '@/features/Campaign/ui/CampaignSelect/CampaignSelect.vue'
import EditContactPersonsModal from '@/features/EditContactPersonsModal/EditContactPersonsModal.vue'
import { useUpdatePersons } from '@/features/ContactPersons/model/services/useUpdatePersons'
import CampaignFilter from '@/features/CompanyFilter/ui/CampaignFilter/CampaignFilter.vue'
import DeleteButton from '@/shared/ui/DeleteButton/DeleteButton.vue'
import { useDeleteCompanies } from '../../model/services/useDeleteCompany.ts'
import ConfirmDeleteModal from '@/shared/ui/ConfirmDeleteModal/ConfirmDeleteModal.vue'
import { formatDateLikeFacebook } from '@/shared/lib/date'

const isModalOpen = ref(false)
const idToDelete = ref<number | null>(null)

const { mutateAsync } = useDeleteCompanies(() => {
    isModalOpen.value = false
})

const handleDelete = (id: number) => {
    idToDelete.value = id
    isModalOpen.value = true
}

const confirmDelete = async () => {
    if (idToDelete.value !== null) {
        try {
            await mutateAsync(idToDelete.value)
            console.log('Rekord został pomyślnie usunięty')
        } catch (error) {
            console.error('Błąd podczas usuwania:', error)
        } finally {
            isModalOpen.value = false
        }
    }
}

const getBackgroundColorClass = (value) => {
    let numValue = Number(value)

    if (typeof value === 'object' && value !== null) {
        numValue = Number(value.kitrate || value.someOtherNumericProperty || 0)
    }

    console.log('Cell value:', value, 'Converted value:', numValue)

    if (isNaN(numValue)) return ''
    if (numValue >= 0 && numValue <= 99) return cls.bgColor0To99
    if (numValue >= 100 && numValue <= 499) return cls.bgColor100To499
    if (numValue >= 500 && numValue <= 999) return cls.bgColor500To999
    if (numValue >= 1000 && numValue <= 1499) return cls.bgColor1000To1499
    if (numValue >= 1500 && numValue <= 1999) return cls.bgColor1500To1999
    if (numValue >= 2000 && numValue <= 2499) return cls.bgColor2000To2499
    if (numValue >= 2500 && numValue <= 2999) return cls.bgColor2500To2999
    if (numValue >= 3000 && numValue <= 3499) return cls.bgColor3000To3499
    if (numValue >= 3500 && numValue <= 3999) return cls.bgColor3500To3999
    if (numValue >= 4000 && numValue <= 4499) return cls.bgColor4000To4499
    if (numValue >= 4500 && numValue <= 4999) return cls.bgColor4500To4999
    return cls.bgColor5000Plus
}

const handleModalUpdate = (value: boolean) => {
    isModalOpen.value = value
}
const companyFilterStore = useCompanyFilterStore()
const { data, isLoading, isFetching, refetch } = useCompanies()
const toast = useToast()
const { onDataChange } = useCompanyActions()
const { mutate: updateContactPerson } = useUpdatePersons()
const isCompanyHistoriesModalOpen = ref(false)
const currentCompanyId = ref('')
const isEditContactPersonsModalOpen = ref(false)
const editContactPersonsCompanyId = ref<string | null>(null)
const userStore = useUserStore()
const { loggedInUser } = storeToRefs(userStore)
const { tables } = storeToRefs(companyFilterStore)

function onContactHistoriesClick(companyId: string) {
    isCompanyHistoriesModalOpen.value = true
    currentCompanyId.value = companyId
}

function onEditContactPersonsClick(companyId: string) {
    isEditContactPersonsModalOpen.value = true
    editContactPersonsCompanyId.value = companyId
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
                    default: () =>
                        info.row.original.last_contact_date
                            ? formatDateLikeFacebook(
                                  new Date(info.row.original.last_contact_date),
                              )
                            : '📖',
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
                className: propcls.largeFont,
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
        cell: (info) =>
            h(
                'span',
                { className: propcls.largeFont },
                info.row.original.supply,
            ),
        header: () => {
            return h(SortHeader, {
                className: propcls.largeFont,
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
        cell: (info) =>
            h(
                'span',
                { className: propcls.largeFont },
                `${info.row.original.frugality.toLocaleString('pl-PL')} zł`,
            ),
        header: () => {
            return h(SortHeader, {
                className: propcls.largeFont,
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
        cell: (info) =>
            h(
                'span',
                { className: propcls.largeFont },
                `${info.row.original.taxincrease.toLocaleString('pl-PL')} zł`,
            ) ?? 'N/A',
        header: () => {
            return h(SortHeader, {
                className: propcls.largeFont,
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
        cell: (info) =>
            h(
                'span',
                { className: propcls.largeFont },
                `${
                    info.row.original.kitrate.toLocaleString('pl-PL') ?? 'N/A'
                } zł`,
            ),
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
    columnHelper.accessor((row) => row.first_name, {
        id: 'firstName',
        cell: (info) =>
            h(CommentInput, {
                key: info.row.original.id,
                className: propcls.largeFont,
                onUpdate: (newValue: string) =>
                    updateContactPerson({
                        id: info.row.original.topContactPersonId!,
                        firstName: newValue,
                    }),
                defaultValue: info.getValue(),
                placeholder: 'Jan',
                validateFn: () => {
                    const isValid = !!info.row.original.topContactPersonId
                    if (!isValid) {
                        toast.error(
                            'Firma nie posiada głównej osoby kontaktowej (z włączoną wartością TOP).',
                        )
                        return isValid
                    }
                    return isValid
                },
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Imię',
                onUpdate: changeOrder('first_name'),
                value:
                    companyFilterStore.getOrderBy === 'first_name'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('first_name'),
            })
        },
    }),
    columnHelper.accessor((row) => row.last_name, {
        id: 'lastName',
        cell: (info) =>
            h(CommentInput, {
                key: info.row.original.id,
                className: propcls.largeFont,
                onUpdate: (newValue: string) =>
                    updateContactPerson({
                        id: info.row.original.topContactPersonId!,
                        lastName: newValue,
                    }),
                defaultValue: info.getValue(),
                placeholder: 'Kowalski',
                validateFn: () => {
                    const isValid = !!info.row.original.topContactPersonId
                    if (!isValid) {
                        toast.error(
                            'Firma nie posiada głównej osoby kontaktowej (z włączoną wartością TOP).',
                        )
                        return isValid
                    }
                    return isValid
                },
            }),
        header: () => {
            return h(SortHeader, {
                name: 'Nazwisko',
                onUpdate: changeOrder('last_name'),
                value:
                    companyFilterStore.getOrderBy === 'last_name'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('last_name'),
            })
        },
    }),
    columnHelper.accessor((row) => row.role, {
        id: 'role',
        cell: (info) =>
            h(CommentInput, {
                key: info.row.original.id,
                className: propcls.largeFont,
                onUpdate: (newRole: string) =>
                    updateContactPerson({
                        id: info.row.original.topContactPersonId!,
                        role: newRole,
                    }),
                defaultValue: info.getValue(),
                placeholder: 'Rola',
                validateFn: () => {
                    const isValid = !!info.row.original.topContactPersonId
                    if (!isValid) {
                        toast.error(
                            'Firma nie posiada głównej osoby kontaktowej (z włączoną wartością TOP).',
                        )
                        return isValid
                    }
                    return isValid
                },
            }),
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
        cell: (info) =>
            h(CommentInput, {
                key: info.row.original.id,
                className: propcls.largeFont,
                onUpdate: (newValue: string) =>
                    updateContactPerson({
                        id: info.row.original.topContactPersonId!,
                        phone: newValue,
                    }),
                defaultValue: info.getValue(),
                placeholder: 'Telefon',
                validateFn: () => {
                    const isValid = !!info.row.original.topContactPersonId
                    if (!isValid) {
                        toast.error(
                            'Firma nie posiada głównej osoby kontaktowej (z włączoną wartością TOP).',
                        )
                        return isValid
                    }
                    return isValid
                },
            }),
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
        cell: (info) =>
            h(CommentInput, {
                key: info.row.original.id,
                className: propcls.largeFont,
                onUpdate: (newValue: string) =>
                    updateContactPerson({
                        id: info.row.original.topContactPersonId!,
                        email: newValue,
                    }),
                defaultValue: info.getValue(),
                placeholder: 'E-mail',
                validateFn: () => {
                    const isValid = !!info.row.original.topContactPersonId
                    if (!isValid) {
                        toast.error(
                            'Firma nie posiada głównej osoby kontaktowej (z włączoną wartością TOP).',
                        )
                        return isValid
                    }
                    return isValid
                },
            }),
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
            h('div', { class: cls.narrowColumn }, [
                h(PriceInput, {
                    onUpdate: onDataChange(info.row.original.id, 'activation'),
                    key: info.row.original.id,
                    defaultValue: info.row.original.activation,
                    withPrice: true,
                    placeholder: 'Kwota',
                }),
            ]),
        header: () =>
            h(SortHeader, {
                name: 'Aktywacja',
                onUpdate: changeOrder('company.activation'),
                value:
                    companyFilterStore.getOrderBy === 'company.activation'
                        ? companyFilterStore.getOrder
                        : null,
                loading: isSortHeaderLoading('company.activation'),
            }),
    }),
    columnHelper.accessor((row) => row.trailerAmount, {
        id: 'rentalFee',
        cell: (info) =>
            h('div', { class: cls.narrowColumn }, [
                h(PriceInput, {
                    onUpdate: onDataChange(info.row.original.id, 'rentalFee'),
                    key: info.row.original.id,
                    defaultValue: info.row.original.rentalFee,
                    withPrice: true,
                    placeholder: 'Kwota',
                }),
            ]),
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
            h('div', { class: cls.narrowColumn }, [
                h(PriceInput, {
                    key: info.row.original.id,
                    onUpdate: onDataChange(info.row.original.id, 'statement'),
                    defaultValue: info.row.original.statement,
                    withPrice: true,
                    placeholder: 'Kwota',
                }),
            ]),
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
        cell: (info) =>
            `${
                info.row.original?.tractor?.toLocaleString('pl-PL') ?? 'N/A'
            } zł`,
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
        cell: (info) =>
            `${
                info.row.original?.trailer?.toLocaleString('pl-PL') ?? 'N/A'
            } zł`,
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
            info.row.original.theirstaxes.toLocaleString('pl-PL')
                ? `${info.row.original.theirstaxes.toLocaleString('pl-PL')} zł`
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
            info.row.original.ourtaxes.toLocaleString('pl-PL')
                ? `${info.row.original.ourtaxes.toLocaleString('pl-PL')} zł`
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
            h('div', { class: cls.narrowColumn }, [
                h(PriceInput, {
                    key: info.row.original.id,
                    onUpdate: onDataChange(
                        info.row.original.id,
                        'tractorAmount',
                    ),
                    defaultValue: info.row.original.tractorAmount,
                    placeholder: 'Ile',
                }),
            ]),
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
            h('div', { class: cls.narrowColumn }, [
                h(PriceInput, {
                    key: info.row.original.id,
                    onUpdate: onDataChange(
                        info.row.original.id,
                        'trailerAmount',
                    ),
                    defaultValue: info.row.original.trailerAmount,
                    placeholder: 'Ile',
                }),
            ]),
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
            h('div', { class: cls.narrowColumn }, [
                h(PriceInput, {
                    key: info.row.original.id,
                    onUpdate: onDataChange(info.row.original.id, 'otherAmount'),
                    defaultValue: info.row.original.otherAmount,
                    placeholder: 'Ile',
                }),
            ]),
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
    columnHelper.accessor((row) => row.campaignId, {
        id: 'campaignId',
        cell: (info) =>
            h(CampaignSelect, {
                key: info.row.original.id,
                name: 'campaigns',
                defaultValue: info.row.original.campaignId,
                onUpdate: onDataChange(info.row.original.id, 'campaignId'),
            }),
        header: () =>
            h(SortHeader, {
                name: 'Kampania',
                filter: CampaignFilter,
                onUpdate: changeOrder('campaign_title'),
                value:
                    companyFilterStore.getOrderBy === 'campaign_title'
                        ? companyFilterStore.getOrder
                        : null,
            }),
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
    columnHelper.accessor((row) => row.contactPersons, {
        id: 'contactPersons',
        cell: (info) =>
            h(
                ActionLink,
                {
                    key: info.row.original.id,
                    onClickFn: () =>
                        onEditContactPersonsClick(info.row.original.id),
                },
                {
                    default: () => 'Edytuj',
                },
            ),
        header: () => {
            return h(SortHeader, {
                name: 'Edyt. os. kont.',
                canSort: false,
            })
        },
    }),
])

const editModalContactPersons = ref<ContactPerson[]>([])

watch(data, () => {
    if (editContactPersonsCompanyId) {
        editModalContactPersons.value =
            data.value?.companies.find(
                (it) => it.id === editContactPersonsCompanyId.value,
            )?.contactPersons ?? []
    }
})

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
    <div :class="[cls.tableWrapper, { [cls.screwed]: screwedSidebar }]">
        <CompanyHistoriesModal
            v-model:isModalOpen="isCompanyHistoriesModalOpen"
            :current-company-id="currentCompanyId"
            :refetch="refetch"
        />
        <EditContactPersonsModal
            v-model:isModalOpen="isEditContactPersonsModalOpen"
            :contact-persons="
                data?.companies?.find(
                    (it) => it.id === editContactPersonsCompanyId,
                )?.contactPersons ?? []
            "
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
                        :class="[
                            cls.bodyValue,
                            cell.column.id === 'kitrate'
                                ? getBackgroundColorClass(cell.getValue())
                                : '',
                        ]"
                    >
                        <FlexRender
                            :key="cell.id"
                            :render="cell.column.columnDef.cell"
                            :props="cell.getContext()"
                        />
                    </td>

                    <td :class="cls.bodyValue">
                        <DeleteButton @click="handleDelete(row.original.id)"
                            >Usuń</DeleteButton
                        >
                    </td>
                </tr>
            </tbody>
        </table>
        <ConfirmDeleteModal
            :isOpen="isModalOpen"
            @update:isOpen="handleModalUpdate"
            @confirmDelete="confirmDelete"
        />
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
