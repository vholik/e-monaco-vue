<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { UserSelect } from '@/entities/User'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { storeToRefs } from 'pinia'

const filterStore = useCompanyFilterStore()

const { getOwners } = storeToRefs(filterStore)

function onChangeFn(value: string[]) {
    filterStore.setOwners(value)
}
</script>

<template>
    <FilterHeader :selected-count="getOwners.length">
        <UserSelect
            as-input
            name="user-select"
            multiple
            :default-value="filterStore.getOwners"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
