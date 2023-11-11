<script setup lang="ts">
import FilterHeader from '@/shared/ui/FilterHeader/FilterHeader.vue'
import { computed, ref, toRefs } from 'vue'
import { useFreeTextOptions } from '../model/api'
import { useCompanyFilterStore } from '@/features/CompanyFilter'
import { storeToRefs } from 'pinia'
import VirtualizedSelect from '@/shared/ui/Select/VirtualizedSelect.vue'

const inputValue = ref('')

interface Props {
    column: string
}

const filterStore = useCompanyFilterStore()

const { getFreeTextColumn } = storeToRefs(filterStore)

const selectedOptions = computed(() => getFreeTextColumn.value(column.value))

const props = defineProps<Props>()

const { column } = toRefs(props)

const { data } = useFreeTextOptions(column)

const values = computed(
    () =>
        data.value
            ?.filter((it: string) => !it !== null)
            ?.map((it: string) => ({ id: it, name: it || 'Brak' }))
            .filter(
                (it: { name: string; id: string }) =>
                    it.name
                        .toLowerCase()
                        .includes(inputValue.value.toLowerCase()) ||
                    selectedOptions.value.includes(it.id),
            )
            .sort((a: { name: string }) =>
                selectedOptions.value.includes(a.name) ? -1 : 1,
            ),
)

function onChangeFn(value: string[]) {
    filterStore.setFreeTextColumn(column.value, value)
}

function onChangeInput(value: string) {
    inputValue.value = value
}
</script>

<template>
    <FilterHeader :selected-count="selectedOptions.length">
        <VirtualizedSelect
            :model-value="selectedOptions"
            with-input
            :name="column"
            multiple
            :options="values ?? []"
            as-input
            @update:model-value="onChangeFn"
            @update:input-value="onChangeInput"
        />
    </FilterHeader>
</template>
