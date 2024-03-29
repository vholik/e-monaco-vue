<script setup lang="ts">
import cls from './DatepickerRange.module.scss'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Flex from '@/shared/ui/Flex/Flex.vue'
import { useField } from 'vee-validate'
import { toRefs, watch, onMounted, ref } from 'vue'
import Error from '@/shared/ui/Error/Error.vue'

interface Props {
    modelValue?: string
    label?: string
    name: string
    placeholder?: string
    width?: string
    defaultValue?: string[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField<string | string[]>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value,
    },
)
const prevSelectedDates = ref<string[] | null>(null)

function onUpdate(value: string | string[]) {
    const dateStrings = Array.isArray(value)
        ? value.map((date) => new Date(date).toISOString())
        : ([new Date(value).toISOString(), new Date(value).toISOString()] as [
              string,
              string,
          ])

    if (dateStrings[1] === '1970-01-01T00:00:00.000Z') {
        dateStrings[1] = dateStrings[0]
    }

    prevSelectedDates.value = [dateStrings[0], dateStrings[1]]
    if (
        dateStrings[0] !== '1970-01-01T00:00:00.000Z' &&
        dateStrings[1] !== '1970-01-01T00:00:00.000Z'
    ) {
        emit('update', [dateStrings[0], dateStrings[1]])
    } else {
        emit('update', null)
    }
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
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
            @update:model-value="onUpdate"
            range
        ></VueDatePicker>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </Flex>
</template>
