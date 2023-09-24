<script setup lang="ts">
import cls from './CurrentFilter.module.scss'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import CloseIcon from '@/shared/assets/icons/Close.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import { storeToRefs } from 'pinia'
import { companyStatusMap } from '@/entities/Status/model/consts/status'

const store = useCompanyFilterStore()

const {
    getContactPersons,
    getOrder,
    getOwners,
    getOrderBy,
    getStatus,
    getMunicipalities,
} = storeToRefs(store)

const sortNameMap: Record<string, string> = {
    nextContactDate: 'Następna data kontaktu',
    statement: 'Deklaracja',
    rentalFee: 'Czyńsz',
    activation: 'Aktywacja',
    'municipality.trailerRate': 'Stakwa naczepa',
    'municipality.tractorRate': 'Stawka ciągnik',
    'municipality.kitRate': 'Zestaw',
    'municipality.taxIncrease': 'Wzrost podatku',
    'contactHistories.contactDate': 'Historia kontaktów',
}
</script>

<template>
    <div :class="cls.CurrentFilter">
        <div
            v-if="getOrderBy"
            :class="cls.filterBtn"
        >
            Sortowanie {{ getOrder === 'asc' ? 'rosnąco' : 'malejąco' }}:
            {{ sortNameMap[getOrderBy] }}

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
    </div>
</template>
