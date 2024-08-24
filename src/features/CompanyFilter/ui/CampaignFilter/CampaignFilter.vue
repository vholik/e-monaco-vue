<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import CampaignSelect from '@/features/Campaign/ui/CampaignSelect/CampaignSelect.vue'
import { useCompanyFilterStore } from '../../model/store/companyFilterStore'
import { storeToRefs } from 'pinia'

const filterStore = useCompanyFilterStore()

const { getCampaigns } = storeToRefs(filterStore)

function onChangeFn(value: string[]) {
    filterStore.setCampaigns(value)
}
</script>

<template>
    <FilterHeader :selected-count="getCampaigns.length">
        <CampaignSelect
            as-input
            name="campaign-select"
            multiple
            :default-value="filterStore.getCampaigns"
            @update="onChangeFn"
        />
    </FilterHeader>
</template>
