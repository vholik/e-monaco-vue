<script setup lang="ts">
import { ref, computed } from 'vue'
import cls from './DashboardPage.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Breadcrumbs from '@/shared/ui/Breadcrumbs/Breadcrumbs.vue'
import { breadcrumbs } from '../model/consts/breadcrumbs'
import { CompaniesFilter, CompaniesTable } from '@/features/Company/index'

const selectionCount = ref<number>(0)
const selectedCompanies = ref<string[]>([])

const selectionCountValue = computed(() => selectionCount.value)

const handleClearSelection = () => {
    selectedCompanies.value = []
    selectionCount.value = 0
}
</script>

<template>
    <div :class="cls.DashboardPage">
        <Flex
            gap="32"
            direction="column"
            align="start"
        >
            <Breadcrumbs :items="breadcrumbs" />
            <Flex
                gap="16"
                direction="column"
                align="start"
            >
                <CompaniesFilter
                    :selection-count="selectionCountValue"
                    :selected-companies="selectedCompanies"
                    @update-selected-companies="handleClearSelection"
                />

                <CompaniesTable
                    @update-selection-count="
                        (count) => {
                            selectionCount = count
                        }
                    "
                    @update-selected-companies="
                        (companies) => {
                            selectedCompanies = companies
                        }
                    "
                />
            </Flex>
        </Flex>
    </div>
</template>
