<script setup lang="ts">
import cls from './CurrentFilter.module.scss'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import CloseIcon from '@/shared/assets/icons/Close.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { storeToRefs } from 'pinia'
import { companyStatusMap } from '@/entities/Status/model/consts/status'
import Flex from '@/shared/ui/Flex/Flex.vue'

const store = useCompanyFilterStore()

const {
    getContactPersons,
    getOrder,
    getOwners,
    getOrderBy,
    getStatus,
    getMunicipalities,
    freeText,
} = storeToRefs(store)

const sortNameMap: Record<string, string> = {
    'company.nextContactDate': 'Nast. kontakt',
    'contactHistories.contactDate': 'Historia kóntaktów',
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
    'company.rentalFee': 'Czyńsz',
    'company.statement': 'Deklaracja',
    'contactPersons.firstName': 'Osoby kontaktowe',
    comment: 'Komentarz',
    nip: 'NIP',
    name: 'Nazwa firmy',
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
            v-if="getStatus"
            :class="cls.filterBtn"
        >
            Status: {{ companyStatusMap[getStatus] }}

            <Icon
                :icon="CloseIcon"
                cursor-pointer
                @click="
                    () => {
                        store.setStatus(null)
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
