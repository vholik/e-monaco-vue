<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { CompanyStatus } from '@/entities/Status'
import { storeToRefs } from 'pinia'
import MultiStatusSelect from '@/entities/Status/ui/StatusSelect/MultiStatusSelect.vue'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: CompanyStatus[]) {
    filterStore.setStatus(value)
}
const { getStatus } = storeToRefs(filterStore)
</script>

<template>
    <FilterHeader :selected-count="getStatus.length">
        <MultiStatusSelect
            as-input
            name="status-select"
            :default-value="filterStore.getStatus ?? undefined"
            multiple
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
