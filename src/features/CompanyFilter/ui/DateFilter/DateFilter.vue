<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { ref, watch } from 'vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { storeToRefs } from 'pinia'
import DatepickerRange from '@/shared/ui/DatepickerRange/DatepickerRange.vue'

const filterStore = useCompanyFilterStore()
const { dateRange } = storeToRefs(filterStore)

const localDateRange = ref(filterStore.dateRange)

function onChangeFn(value: string[]) {
    localDateRange.value = value
    filterStore.setDateRange(value)
}

function onClearDateRange() {
    localDateRange.value = []
    filterStore.setDateRange([])
}

watch(dateRange, (newValue) => {
    localDateRange.value = newValue
})
</script>

<template>
    <FilterHeader>
        <DatepickerRange
            name="date-select"
            multiple
            :default-value="localDateRange"
            @update="onChangeFn"
            @clear="onClearDateRange"
        />
    </FilterHeader>
</template>
