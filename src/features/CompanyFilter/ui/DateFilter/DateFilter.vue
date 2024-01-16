<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { UserSelect } from '@/entities/User'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { storeToRefs } from 'pinia'
import DatepickerRange from '@/shared/ui/DatepickerRange/DatepickerRange.vue'

const filterStore = useCompanyFilterStore()

const { dateRange } = storeToRefs(filterStore)

function onChangeFn(value: string[]) {
    filterStore.setDateRange(value)
}
</script>

<template>
    <FilterHeader :selected-count="dateRange.length">
        <DatepickerRange
            name="date-select"
            multiple
            :default-value="filterStore.dateRange"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
