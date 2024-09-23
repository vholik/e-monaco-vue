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
    multiple?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['update'])

const { name, defaultValue } = toRefs(props)

const { errorMessage, value, handleChange } = useField<
    string | string[] | null
>(name, undefined, {
    initialValue: defaultValue?.value || null,
})

function onUpdate(value: string | string[] | null) {
    emit('update', value)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value || null)
})
</script>

<template>
    <div
        v-if="data"
        :class="cls.UserSelect"
    >
        <Select
            v-model="value"
            :multiple="multiple"
            :options="
                data.map((it: User) => ({
                    id: it.id,
                    name: it.firstName + ' ' + it.lastName,
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
