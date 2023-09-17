<script setup lang="ts">
import { ref, toRefs, type Ref } from 'vue'
import cls from './ContactPersonSelect.module.scss'
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
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const { errorMessage, value } = useField<string>(name, undefined)
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
    />
</template>
