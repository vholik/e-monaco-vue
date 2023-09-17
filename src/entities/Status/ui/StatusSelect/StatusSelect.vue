<script setup lang="ts">
import type { SelectOption } from '@/shared/ui/Select/types'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import { toRefs } from 'vue'
import { options } from '../../model/consts/status'

interface Props {
    asInput?: boolean
    label?: string
    type?: string
    name: string
    errorMessage?: string
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const { errorMessage, value } = useField(name, undefined, {
    initialValue: options[0].id,
})
</script>

<template>
    <Select
        :options="options"
        v-bind="$props"
        v-model="value"
        :errorMessage="errorMessage"
    />
</template>
