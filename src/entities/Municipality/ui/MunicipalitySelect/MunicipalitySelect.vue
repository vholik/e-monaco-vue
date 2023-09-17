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
            data.map((it: Municipality) => ({
                id: it.id,
                name: it.name,
            }))
        "
        :asInput="asInput"
        :label="label"
        v-bind="$props"
        :errorMessage="errorMessage"
    />
</template>
