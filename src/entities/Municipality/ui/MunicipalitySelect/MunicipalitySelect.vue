<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { useMunicipalities } from '../../model/services/useMunicipalities'
import type { Municipality } from '../../model/types/municipality'

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

const { errorMessage, value, handleChange } = useField<string | string[]>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value,
    },
)

let inputValue = ref('')
const { data } = useMunicipalities(value, inputValue)

function onUpdate(value: string) {
    emit('update', value)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
</script>

<template>
    <Select
        v-model="value"
        v-bind="$props"
        v-model:input-value="inputValue"
        :multiple="multiple"
        :options="
            data?.municipalities?.map((it: Municipality) => ({
                id: it.id,
                name: it.name,
            }))
        "
        with-input
        :as-input="asInput"
        :label="label"
        :error-message="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
