<script setup lang="ts">
import type { SelectOption } from '@/shared/ui/Select/types'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { toRefs } from 'vue'
import { options } from '../../model/consts/status'
import type { CompanyStatus } from '../..'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    errorMessage?: string
    onChangeFn?: (value: string) => void
    defaultValue?: string
}

const props = defineProps<Props>()

const { name, onChangeFn, defaultValue } = toRefs(props)

const { errorMessage, value } = useField(name, undefined, {
    initialValue: defaultValue?.value || options[0].id,
})

function onUpdate(value: string) {
    onChangeFn?.value?.(value)
}
</script>

<template>
    <Select
        :options="options"
        v-bind="$props"
        v-model="value"
        :errorMessage="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
