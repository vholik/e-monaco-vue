<script setup lang="ts">
import cls from './CurrentFilter.module.scss'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import CloseIcon from '@/shared/assets/icons/Close.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { storeToRefs } from 'pinia'
import { companyStatusMap } from '@/entities/Status/model/consts/status'
import Flex from '@/shared/ui/Flex/Flex.vue'

const store = useCompanyFilterStore()
const formatDate = (dateString: string | null) => {
    if (!dateString) return ''

    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

const {
    getContactPersons,
    getOrder,
    getOwners,
    getOrderBy,
    getStatus,
    getMunicipalities,
    freeText,
    from_next_date,
    to_next_date,
} = storeToRefs(store)

const sortNameMap: Record<string, string> = {
    from_next_date: 'Data kontaktu (od)',
    to_next_date: 'Data kontaktu (do)',
    'company.nextContactDate': 'Nast. kontakt',
    last_contact_date: 'Historia kontaktów',
    'owner.firstName': 'Właściciel',
    'company.comment': 'Komentarz',
    'company.nip': 'NIP',
    'company.name': 'Nazwa firmy',
    'company.status': 'Status',
    'municipality.name': 'Gmina',
    'municipality.taxIncrease': 'Wzrost podatku',
    'municipality.kitRate': 'Zestaw',
    'company.tractorAmount': 'Ciągniki',
    'company.trailerAmount': 'Naczepy',
    'company.otherAmount': 'Inne',
    'company.supply': 'Tabor',
    'municipality.tractorRate': 'Stawka ciągnik',
    'municipality.trailerRate': 'Stawka naczepa',
    'company.theirsTaxes': 'Podatek u nich',
    'company.ourTaxes': 'Podatek u nas',
    'company.frugality': 'Oszczędność',
    'company.activation': 'Aktywacja',
    'company.rentalFee': 'Czynsz',
    'company.statement': 'Deklaracja',
    full_name: 'Imię osoby kontaktowej',
    comment: 'Komentarz',
    nip: 'NIP',
    name: 'Nazwa firmy',
    supply: 'Tabor',
    frugality: 'Oszczędność',
    taxincrease: 'Wzrost podatku',
    kitrate: 'Zestaw',
    year: 'Rok',
    role: 'Rola',
    phone: 'Telefon',
    email: 'Email',
    tractor: 'Stawka ciągnik',
    trailer: 'Stawka naczepa',
    theirstaxes: 'Podatek u nich',
    ourtaxes: 'Podatek u nas',
}
</script>

<template>
    <div :class="cls.CurrentFilter">
        <div
            v-if="getOrderBy"
            :class="cls.filterBtn"
        >
            Sortowanie {{ getOrder === 'asc' ? 'rosnąco' : 'malejąco' }}:
            {{ sortNameMap[getOrderBy] ?? getOrderBy }}

            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.setOrder(null)
                        store.setOrderBy(null)
                    }
                "
            />
        </div>
        <div
            v-if="from_next_date || to_next_date"
            :class="cls.filterBtn"
        >
            Data kontaktu: od {{ formatDate(from_next_date) }}
            {{ from_next_date && to_next_date ? ' ' : '' }}
            do {{ formatDate(to_next_date) }}
            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.from_next_date = ''
                        store.to_next_date = ''
                    }
                "
            />
        </div>

        <div
            v-if="getOwners?.length"
            :class="cls.filterBtn"
        >
            Ownerzy
            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.setOwners([])
                    }
                "
            />
        </div>
        <div
            v-if="getContactPersons?.length"
            :class="cls.filterBtn"
        >
            Osoby kontaktowe

            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.setContactPersons([])
                    }
                "
            />
        </div>
        <div
            v-if="!!getStatus.length"
            :class="cls.filterBtn"
        >
            Statusy

            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.setStatus([])
                    }
                "
            />
        </div>
        <div
            v-if="getMunicipalities?.length"
            :class="cls.filterBtn"
        >
            Gminy

            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.setMunicipalities([])
                    }
                "
            />
        </div>
        <Flex
            v-for="[key, value] in Object.entries(freeText)"
            :key="key"
            align="center"
            gap="4"
        >
            <div
                v-if="value.length"
                :class="cls.filterBtn"
            >
                {{ sortNameMap[key] ?? key }}: {{ value.join(', ') }}
                <Icon
                    :icon="CloseIcon"
                    cursor-pointer
                    @click="
                        () => {
                            store.setFreeTextColumn(key, [])
                        }
                    "
                />
            </div>
        </Flex>
    </div>
</template>
