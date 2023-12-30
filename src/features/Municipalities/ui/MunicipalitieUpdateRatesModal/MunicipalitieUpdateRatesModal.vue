<script setup lang="ts">
import {
    ref,
    onMounted,
    h,
    computed,
    toRefs,
    defineProps,
    defineEmits,
} from 'vue'
import cls from '../AddMunicipalitiesModal.module.scss'
import Modal from '@/shared/ui/Modal/Modal.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Button from '@/shared/ui/Button/Button.vue'
import Note from '@/shared/ui/Note/Note.vue'
import Tabs from '@/shared/ui/Tabs/Tabs.vue'
import { useUpdateMunicipality } from '@/features/Municipalities/model/services/useUpdateMunicipalities'
import { useGetMunicipality } from '@/features/Municipalities/model/services/useGetMunicialities'
import Input from '@/shared/ui/Input/Input.vue'

interface Props {
    isModalOpen: boolean
    municipalityId: string
}

const props = defineProps<Props>()

const { municipalityId } = toRefs(props)

const emit = defineEmits(['update:isModalOpen'])

const formState = ref<{
    selectedYear: number | null
    tractorRate: number | null
    trailerRate: number | null
    otherRate: number | null
}>({
    selectedYear: null,
    tractorRate: null,
    trailerRate: null,
    otherRate: null,
})
const { mutate, isLoading, error } = useUpdateMunicipality()

const { data: municipalityData } = useGetMunicipality(municipalityId)

console.log('Municipality Data:', municipalityData.value)

onMounted(() => {
    if (
        municipalityData.value &&
        municipalityData.value.rates &&
        municipalityData.value.rates.length > 0
    ) {
        formState.value.selectedYear = municipalityData.value.rates[0].year
    }
})

const getUniqueYearsForMunicipality = computed(() => {
    return municipalityData.value?.rates.map((rate) => rate.year)
})
const onSubmit = () => {
    emit('update:isModalOpen', false)

    const dataToMutate = {
        id: municipalityId.value,
        rates: municipalityData.value?.rates,
    }
    mutate(dataToMutate)
}

const generateTabPanelsForMunicipality = computed(() => {
    return municipalityData.value?.rates.map((ratesForYear) => {
        const clonedRates = { ...ratesForYear }
        return () => [
            h(Input, {
                modelValue: clonedRates.tractorRate,
                'onUpdate:modelValue': (value) => {
                    clonedRates.tractorRate = value
                },
                name: `tractorRate`,
                label: 'Stawka ciągnika',
                placeholder: 'xxx',
                type: 'number',
                customId: ratesForYear.id,
                value: ratesForYear.tractorRate,
            }),
            h(Input, {
                modelValue: clonedRates.trailerRate,
                'onUpdate:modelValue': (value) => {
                    clonedRates.trailerRate = value
                },
                name: `trailerRate`,
                label: 'Stawka naczepy',
                placeholder: 'xxxx',
                type: 'number',
                value: ratesForYear.trailerRate,
            }),
            h(Input, {
                modelValue: clonedRates.otherRate,
                'onUpdate:modelValue': (value) => {
                    clonedRates.otherRate = value
                },
                name: `otherRate`,
                label: 'Inne',
                placeholder: 'xxxx',
                type: 'number',
                value: ratesForYear.otherRate,
            }),
        ]
    })
})

const generateTabOptions = computed(() => {
    return getUniqueYearsForMunicipality.value?.map((year) => String(year))
})

const tabIndex = ref(0)
console.log('Tab Panels:', generateTabPanelsForMunicipality.value)
console.log('Tab Options:', generateTabOptions.value)
</script>

<template>
    <div :class="cls.MunicipalitiesUpdateRatesModal">
        <Modal
            :is-open="props.isModalOpen"
            title="Aktualizacja stawek gminy"
            @update:isOpen="emit('update:isModalOpen', $event)"
        >
            <div>
                <Flex
                    gap="8"
                    direction="column"
                    align="start"
                    :class="cls.wrapper"
                >
                    <Tabs
                        :tab-panels="generateTabPanelsForMunicipality || []"
                        :tab-options="generateTabOptions || []"
                    >
                        {{ tabIndex }}
                    </Tabs>

                    <Note v-if="error">
                        Nie udało nam się dodać gminy. Spróbuj ponownie później.
                    </Note>
                </Flex>
                <div :class="cls.footer">
                    <Button
                        :class="cls.button"
                        :disabled="isLoading"
                        type="button"
                        @click="onSubmit"
                    >
                        Aktualizuj
                    </Button>
                </div>
            </div>
        </Modal>
    </div>
</template>
