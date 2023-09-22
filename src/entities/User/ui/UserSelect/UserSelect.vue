<script setup lang="ts">
import type { SelectOption } from '@/shared/ui/Select/types'
import cls from './UserSelect.module.scss'
import Select from '@/shared/ui/Select/Select.vue'
import { computed, toRef, toRefs, watchEffect } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useOwners } from '../../model/services/useOwners'
import type { User } from '../../model/types/user'

const { data } = useOwners()

interface Props {
    asInput?: boolean
    label?: string
    name: string
    defaultValue?: string
    onChangeFn?: (value: string) => void
}

const props = defineProps<Props>()

const { name, defaultValue, onChangeFn } = toRefs(props)

const { errorMessage, value } = useField<string>(name, undefined, {
    initialValue: defaultValue?.value,
})

function onUpdate(value: string) {
    onChangeFn?.value?.(value)
}
</script>

<template>
    <div :class="cls.UserSelect">
        <Select
            v-model="value"
            :options="
                data?.map((it: User) => ({
                    id: it.id,
                    name: [it.firstName, it.lastName || ''].join(' '),
                    role: it.role,
                }))
            "
            :with-avatar="true"
            :as-input="asInput"
            :label="label"
            v-bind="$props"
            :error-message="errorMessage"
            @update="onUpdate"
        />
    </div>
</template>
