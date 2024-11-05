<script setup lang="ts">
import cls from './Datepicker.module.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { useField } from 'vee-validate'
import { toRefs, watch, ref } from 'vue'
import Error from '@/shared/ui/Error/Error.vue'

interface Props {
    modelValue?: string
    label?: string
    name: string
    placeholder?: string
    width?: string
    defaultValue?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'change'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField<string>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value,
    },
)

watch(defaultValue, (newValue) => {
    handleChange(newValue)
})

watch(value, (newValue) => {
    emit('update:modelValue', newValue)
    emit('change', newValue)
})

function onUpdate(newValue: string) {
    value.value = newValue
}
</script>

<template>
    <Flex
        gap="4"
        direction="column"
        align="start"
        max
    >
        <label
            v-if="label"
            :class="cls.label"
            >{{ label }}</label
        >
        <VueDatePicker
            v-model="value"
            teleport="body"
            position="left"
            locale="pl-PL"
            select-text="Wybierz"
            cancel-text="Anuluj"
            format="dd.MM.yyyy"
            :enable-time-picker="false"
            :placeholder="placeholder"
            :style="{
                '--dp-input-padding': '0.5em 0.75em',
                '--dp-font-family': 'var(--font-family)',
                '--dp-font-size': 'var(--font-size-s)',
                '--dp-border-radius': 'var(--default-border-radius)',
                '--dp-background-color': 'var(--light-grey-color)',
                '--dp-border-color-hover': 'var(--stroke-color)',
                width: width,
                '--dp-border-color': 'var(--stroke-color)',
                '--dp-primary-color': 'var(--primary-variant-color)',
            }"
            hide-input-icon
            @update:model-value="onUpdate"
        ></VueDatePicker>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </Flex>
</template>
