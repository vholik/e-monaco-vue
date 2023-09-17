<script setup lang="ts">
import { ref, toRefs, type Ref } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { useContactPersons } from '../../model/services/useContactPersons'
import type { ContactPerson } from '../../model/types/contactPerson'

const { data } = useContactPersons()

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    errorMessage?: string
    onChangeFn?: (value: string[]) => void
    defaultValue?: string[]
}

const props = defineProps<Props>()

const { name, onChangeFn, defaultValue } = toRefs(props)

const { errorMessage, value } = useField<string[]>(name, undefined, {
    initialValue: defaultValue?.value || [],
})

function onUpdate(value: string[]) {
    onChangeFn?.value?.(value)
}
</script>

<template>
    <Select
        v-model="value"
        :options="
            data.map((it: ContactPerson) => ({
                id: it.id,
                name: [it.firstName, it?.lastName].filter(Boolean).join(' '),
            }))
        "
        :multiple="true"
        :asInput="asInput"
        :label="label"
        v-bind="$props"
        :errorMessage="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
