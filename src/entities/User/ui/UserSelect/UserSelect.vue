<script setup lang="ts">
import cls from './UserSelect.module.scss'
import Select from '@/shared/ui/Select/Select.vue'
import { toRefs, watch } from 'vue'
import { useField } from 'vee-validate'
import { useOwners } from '../../model/services/useOwners'
import type { User } from '../../model/types/user'

const { data } = useOwners()

interface Props {
    asInput?: boolean
    label?: string
    name: string
    defaultValue?: string | string[]
    mutiple?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField<string | string[]>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value,
    },
)

function onUpdate(value: string | string[]) {
    emit('update', value)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
</script>

<template>
    <div
        v-if="data"
        :class="cls.UserSelect"
    >
        <Select
            v-model="value"
            :multiple="mutiple"
            :options="
                data.map((it: User) => ({
                    id: it.id,
                    name: it.firstName,
                    role: it.role,
                }))
            "
            :as-input="asInput"
            :label="label"
            v-bind="$props"
            :error-message="errorMessage"
            @update:model-value="onUpdate"
        />
    </div>
</template>
