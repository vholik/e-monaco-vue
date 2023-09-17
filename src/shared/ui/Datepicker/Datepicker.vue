<script setup lang="ts">
import cls from './Datepicker.module.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { useField } from 'vee-validate'
import { toRefs } from 'vue'
import Error from '@/shared/ui/Error/Error.vue'

interface Props {
    modelValue?: string
    label?: string
    name: string
    placeholder?: string
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const { errorMessage, value } = useField<string>(name, undefined)
</script>

<template>
    <Flex
        gap="4"
        direction="column"
        align="start"
        max
    >
        <label
            :class="cls.label"
            v-if="label"
            >{{ label }}</label
        >
        <VueDatePicker
            locale="pl-PL"
            select-text="Wybierz"
            cancel-text="Anuluj"
            :placeholder="placeholder"
            :style="{
                '--dp-input-padding': '0.5em 0.75em',
                '--dp-font-family': 'var(--font-family)',
                '--dp-font-size': 'var(--font-size-s)',
                '--dp-border-radius': 'var(--default-border-radius)',
                '--dp-background-color': 'var(--light-grey-color)',
                '--dp-border-color-hover': 'var(--stroke-color)',
                '--dp-border-color': 'var(--stroke-color)',
                '--dp-primary-color': 'var(--primary-variant-color)',
            }"
            v-model="value"
            hide-input-icon
        ></VueDatePicker>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </Flex>
</template>
