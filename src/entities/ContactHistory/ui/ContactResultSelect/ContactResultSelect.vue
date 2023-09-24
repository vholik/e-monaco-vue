<script setup lang="ts">
import { contactResultOptions } from '../../model/consts/contactHistory'
import { toRefs } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    defaultValue?: string
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const { errorMessage, value } = useField<string>(name, undefined, {
    initialValue: contactResultOptions[0].id,
})
</script>

<template>
    <Select
        v-model="value"
        :options="contactResultOptions"
        :as-input="asInput"
        :label="label"
        v-bind="$props"
        :error-message="errorMessage"
    />
</template>
