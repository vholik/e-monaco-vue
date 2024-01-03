<script setup lang="ts">
import Select from '@/shared/ui/Select/Select.vue'
import cls from './TableSelect.module.scss'
import { useCompanyFilterStore } from '@/features/CompanyFilter'
import { companyTableOptions } from '../../model/consts/options'

const store = useCompanyFilterStore()
</script>

<template>
    <Select
        :class="cls.TableSelect"
        :options="companyTableOptions"
        :multiple="true"
        v-bind="$props"
        hide-values
        name="table-select"
        placeholder="Pola do wyśw."
        as-input
        :model-value="store.getTables ?? companyTableOptions.map((it) => it.id)"
        @update:model-value="store.setTables"
    />
</template>
