<script setup lang="ts">
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { toRefs, watch, defineProps, defineEmits } from 'vue'
import { options } from '../../model/consts/status'
import { CompanyStatus } from '../..'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    defaultValue?: CompanyStatus[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField(name, undefined, {
    initialValue: defaultValue?.value || options[0].id,
})

function onUpdate(value: CompanyStatus[]) {
    emit('update', value)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
</script>

<template>
    <Select
        v-bind="$props"
        v-model="value"
        multiple
        :options="options"
        :error-message="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
