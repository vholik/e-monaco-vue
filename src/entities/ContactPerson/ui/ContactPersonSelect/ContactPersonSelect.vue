<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { useContactPersons } from '@/entities/ContactPerson/model/services/useContactPersons'
import type { ContactPerson } from '../../model/types/contactPerson'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    defaultValue?: string[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField<string[]>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value || [],
    },
)

let inputValue = ref('')
const { data } = useContactPersons(inputValue, value, defaultValue)

function onUpdate(value: string[]) {
    emit('update', value)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
</script>

<template>
    <Select
        v-model="value"
        v-model:inputValue="inputValue"
        :options="
            data.map((it: ContactPerson) => ({
                id: it.id,
                name: [it.firstName, it?.lastName].filter(Boolean).join(' '),
                info: `Telefon: ${it.phone}, E-Mail: ${it.email}, Rola: ${it.role}`,
            }))
        "
        :multiple="true"
        :as-input="asInput"
        :label="label"
        v-bind="$props"
        :error-message="errorMessage"
        with-input
        @update:modelValue="onUpdate"
    />
</template>
