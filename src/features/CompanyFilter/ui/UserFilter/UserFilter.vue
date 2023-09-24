<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { UserSelect } from '@/entities/User'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'

const filterStore = useCompanyFilterStore()

function onChangeFn(value: string[]) {
    filterStore.setOwners(value)
}
</script>

<template>
    <FilterHeader>
        <UserSelect
            as-input
            name="user-select"
            mutiple
            :default-value="filterStore.getOwners"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
