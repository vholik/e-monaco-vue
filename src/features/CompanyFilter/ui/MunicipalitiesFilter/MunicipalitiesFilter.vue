<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { MunicipalitySelect } from '@/entities/Municipality'
import { storeToRefs } from 'pinia'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: string[]) {
    filterStore.setMunicipalities(value)
}

const { getMunicipalities } = storeToRefs(filterStore)
</script>

<template>
    <FilterHeader :selected-count="getMunicipalities.length">
        <MunicipalitySelect
            as-input
            name="municipalities-select"
            :default-value="filterStore.getMunicipalities || undefined"
            multiple
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
