<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import DatepickerRange from '@/shared/ui/DatepickerRange/DatepickerRange.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import cls from './DateFilter.module.scss'
import Button from '@/shared/ui/Button/Button.vue'

const filterStore = useCompanyFilterStore()
const { dateRange } = storeToRefs(filterStore)
const localDateRange = ref(filterStore.dateRange)

function onChangeFn(value: string[]) {
    localDateRange.value = value
    filterStore.setDateRange(value)
}

function onClearDateRange() {
    localDateRange.value = []
}

watch(dateRange, (newValue) => {
    localDateRange.value = newValue
})

async function handleNoContactDate() {
    filterStore.setDateNull()
}
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

        <Button
            size="size_s"
            variant="secondary"
            :max="false"
            @click="handleNoContactDate"
        >
            Brak daty kontaktu
        </Button>
    </FilterHeader>
</template>
