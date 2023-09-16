<script setup lang="ts">
import { ref, toRefs } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    errorMessage?: string
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const options = [
    {
        id: '1',
        name: 'siema',
    },
    {
        id: '2',
        name: 'wow',
    },
]

const { errorMessage, value } = useField(name, undefined, {
    initialValue: options[0].id,
})
</script>

<template>
    <Select
        v-model="value"
        :options="options"
        :asInput="asInput"
        :label="label"
        v-bind="$props"
        :errorMessage="errorMessage"
    />
</template>
