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

function getInfo(person: ContactPerson) {
    const value = []

    if (person.phone) {
        value.push(`Telefon: ${person.phone}`)
    }
    if (person.firstName) {
        value.push(`Imię: ${person.firstName} ${person.lastName ?? ''}`)
    }
    if (person.email) {
        value.push(`E-Mail: ${person.email}`)
    }
    if (person.role) {
        value.push(`Rola: ${person.role}`)
    }

    return value.join(', ')
}

function formatName(person: ContactPerson) {
    if (person.phone) {
        return person.phone
    }
    if (person.firstName || person.lastName) {
        return `${person.firstName ?? ''} ${person.lastName ?? ''}`.trim()
    }
    return person.email ?? ''
}
</script>

<template>
    <Select
        v-model="value"
        v-model:inputValue="inputValue"
        :options="
            data.map((it: ContactPerson) => ({
                id: it.id,
                name: formatName(it),
                info: getInfo(it),
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
