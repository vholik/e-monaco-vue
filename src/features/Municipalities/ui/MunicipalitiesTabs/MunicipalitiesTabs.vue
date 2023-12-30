<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, h } from 'vue'
import Note from '@/shared/ui/Note/Note.vue'
import Tabs from '@/shared/ui/Tabs/Tabs.vue'
import PriceInput from '@/shared/ui/PriceInput/PriceInput.vue'

const props = defineProps<{
    municipalityData: any
    getUniqueYearsForMunicipality: any
    isLoading: boolean
    error: boolean
}>()

const emit = defineEmits(['update:isModalOpen'])

const generateTabPanels = computed(() => {
    return props.municipalityData.value?.rates.map((ratesForYear: any) => {
        return () => [
            h(PriceInput, {
                modelValue: ratesForYear.tractorRate,
                'onUpdate:modelValue': (value: number) => {
                    ratesForYear.tractorRate = value
                },
                name: `tractorRate`,
                label: 'Stawka ciągnika',
                placeholder: 'xxx',
                type: 'number',
                customId: ratesForYear.id,
            }),
        ]
    })
})

const generateTabOptions = computed(() => {
    return props.getUniqueYearsForMunicipality.value?.map((year: number) =>
        String(year),
    )
})

const onSubmit = () => {
    emit('update:isModalOpen', false)
}

const tabIndex = ref(0)
</script>
<template>
    <div>
        <Tabs
            :tab-panels="generateTabPanels"
            :tab-options="generateTabOptions"
        >
            {{ tabIndex }}
        </Tabs>
        <Note v-if="error">
            Nie udało nam się dodać gminy. Spróbuj ponownie później.
        </Note>
    </div>
</template>
