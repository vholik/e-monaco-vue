<script setup lang="ts">
import { ref, toRefs, type Ref } from 'vue'
import cls from './ContactPersonSelect.module.scss'
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
    initialValue: [],
})
</script>

<template>
    <Select
        v-model="value"
        :options="options"
        :multiple="true"
        :asInput="asInput"
        :label="label"
        v-bind="$props"
        :errorMessage="errorMessage"
    />
</template>
