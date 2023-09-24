<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { ContactPersonSelect } from '@/entities/ContactPerson'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: string[]) {
    filterStore.setContactPersons(value)
}
</script>

<template>
    <FilterHeader>
        <ContactPersonSelect
            as-input
            name="persons-select"
            :default-value="filterStore.getContactPersons"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
