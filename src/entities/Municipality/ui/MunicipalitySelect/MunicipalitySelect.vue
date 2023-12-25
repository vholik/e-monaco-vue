<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { useMunicipalities } from '../../model/services/useMunicipalities'
import type { Municipality } from '../../model/types/municipality'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    defaultValue?: string | string[] | Municipality
    multiple?: boolean
}

const props = defineProps<Props>()

const { name, defaultValue } = toRefs(props)
const emit = defineEmits(['update'])

const initialValue =
    typeof defaultValue?.value === 'object'
        ? (defaultValue?.value as Municipality)?.id
        : defaultValue?.value

const { errorMessage, value, handleChange } = useField<string | string[]>(
    name,
    undefined,
    {
        initialValue: initialValue,
    },
)

let inputValue = ref('')
const { data } = useMunicipalities(value, inputValue)

function onUpdate(value: string) {
    emit('update', value)
}

watch(defaultValue!, () => {
    if (typeof defaultValue?.value === 'object') {
        handleChange((defaultValue.value as Municipality)?.id)
        return
    }
    handleChange(defaultValue?.value)
})

const options = computed(() => {
    const municipalities = data?.value?.municipalities?.map(
        (it: Municipality) => ({
            id: it.id,
            name: it.name,
        }),
    )

    if (typeof defaultValue?.value === 'object') {
        const find = municipalities?.find(
            (it) => it.id === (defaultValue.value as Municipality)?.id,
        )

        if (!find) {
            municipalities?.push({
                id: (defaultValue.value as Municipality)?.id,
                name: (defaultValue.value as Municipality)?.name,
            })
        }
    }

    return municipalities
})
</script>

<template>
    <Select
        v-model="value"
        v-bind="$props"
        v-model:input-value="inputValue"
        :multiple="multiple"
        :options="options"
        with-input
        :as-input="asInput"
        :label="label"
        :error-message="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
