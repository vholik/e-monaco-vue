<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { CompanyStatus, StatusSelect } from '@/entities/Status'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: CompanyStatus) {
    filterStore.setStatus(value)
}
</script>

<template>
    <FilterHeader>
        <StatusSelect
            as-input
            name="status-select"
            :default-value="filterStore.getStatus || undefined"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
