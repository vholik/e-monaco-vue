<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { CompanyStatus, StatusSelect } from '@/entities/Status'
import { storeToRefs } from 'pinia'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: CompanyStatus) {
    filterStore.setStatus(value)
}
const { getStatus } = storeToRefs(filterStore)
</script>

<template>
    <FilterHeader :selected-count="getStatus ? 1 : 0">
        <StatusSelect
            as-input
            name="status-select"
            :default-value="filterStore.getStatus ?? undefined"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
