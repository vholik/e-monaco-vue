<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { MunicipalitySelect } from '@/entities/Municipality'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: string[]) {
    filterStore.setMunicipalities(value)
}
</script>

<template>
    <FilterHeader>
        <MunicipalitySelect
            as-input
            name="municipalities-select"
            :default-value="filterStore.getMunicipalities || undefined"
            multiple
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
