<script setup lang="ts">
import { toRefs } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { useMunicipalities } from '../../model/services/useMunicipalities'
import type { Municipality } from '../../model/types/municipality'

const { data } = useMunicipalities()

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    defaultValue?: string | string[]
    multiple?: boolean
}

const props = defineProps<Props>()

const { name, defaultValue } = toRefs(props)
const emit = defineEmits(['update'])

const { errorMessage, value } = useField<string | string[]>(name, undefined, {
    initialValue: defaultValue?.value,
})

function onUpdate(value: string) {
    emit('update', value)
}
</script>

<template>
    <Select
        v-model="value"
        :multiple="multiple"
        :options="
            data.map((it: Municipality) => ({
                id: it.id,
                name: it.name,
            }))
        "
        :as-input="asInput"
        :label="label"
        v-bind="$props"
        :error-message="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
