<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { ContactPersonSelect } from '@/entities/ContactPerson'
import { storeToRefs } from 'pinia'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: string[]) {
    filterStore.setContactPersons(value)
}

const { getContactPersons } = storeToRefs(filterStore)
</script>

<template>
    <FilterHeader :selected-count="getContactPersons.length">
        <ContactPersonSelect
            as-input
            name="persons-select"
            :default-value="filterStore.getContactPersons"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
