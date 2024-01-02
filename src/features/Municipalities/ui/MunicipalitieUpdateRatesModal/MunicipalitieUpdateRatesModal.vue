<script setup lang="ts">
import {
    ref,
    onMounted,
    h,
    computed,
    toRefs,
    defineProps,
    defineEmits,
    watch,
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

const { municipalityId, isModalOpen } = toRefs(props)

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
const { data: municipalityData, refetch } = useGetMunicipality(municipalityId)
const { mutate, isLoading, error } = useUpdateMunicipality(refetch)

const rates = ref(municipalityData.value?.rates)

watch(municipalityData, () => {
    rates.value = municipalityData.value?.rates
})

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

const generateTabPanelsForMunicipality = computed(() => {
    return municipalityData.value?.rates.map((ratesForYear) => {
        return () => [
            h(Input, {
                name: `tractorRate`,
                label: 'Stawka ciągnika',
                placeholder: 'xxx',
                type: 'number',
                value: ratesForYear.tractorRate,
                'onUpdate:modelValue': (value: number) => {
                    const mappedRates = rates.value?.map((it) => ({ ...it }))
                    const find = mappedRates?.find(
                        (it) => it.year === ratesForYear.year,
                    )
                    if (find) {
                        find.tractorRate = parseInt(value)
                    }

                    rates.value = mappedRates
                },
            }),
            h(Input, {
                name: `trailerRate`,
                label: 'Stawka naczepy',
                placeholder: 'xxxx',
                type: 'number',
                value: ratesForYear.trailerRate,
                'onUpdate:modelValue': (value: number) => {
                    const mappedRates = rates.value?.map((it) => ({ ...it }))
                    const find = mappedRates?.find(
                        (it) => it.year === ratesForYear.year,
                    )
                    if (find) {
                        find.trailerRate = parseInt(value)
                    }

                    rates.value = mappedRates
                },
            }),
            h(Input, {
                name: `otherRate`,
                label: 'Inne',
                placeholder: 'xxxx',
                type: 'number',
                value: ratesForYear.otherRate,
                'onUpdate:modelValue': (value: number) => {
                    ratesForYear.value = value
                },
                'onUpdate:modelValue': (value: number) => {
                    const mappedRates = rates.value?.map((it) => ({ ...it }))
                    const find = mappedRates?.find(
                        (it) => it.year === ratesForYear.year,
                    )
                    if (find) {
                        find.otherRate = parseInt(value)
                    }

                    rates.value = mappedRates
                },
            }),
        ]
    })
})

const onSubmit = () => {
    mutate({ rates: rates.value, id: municipalityId.value })
    emit('update:isModalOpen', false)
}

const generateTabOptions = computed(() => {
    return getUniqueYearsForMunicipality.value?.map((year) => String(year))
})

const tabIndex = ref(0)
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
