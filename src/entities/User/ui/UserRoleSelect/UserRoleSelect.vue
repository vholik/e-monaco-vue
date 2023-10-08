<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import Select from '@/shared/ui/Select/Select.vue'
import { useField } from 'vee-validate'
import type { UserRoles } from '@/entities/User/model/types/roles'

interface Props {
    asInput?: boolean
    label?: string
    name: string
    defaultValue?: UserRoles | UserRoles[]
    multiple?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])

const { name, defaultValue, multiple } = toRefs(props)

const { errorMessage, value, handleChange } = useField<UserRoles | UserRoles[]>(
    name,
    undefined,
    {
        initialValue: defaultValue?.value,
    },
)

let inputValue = ref('')

const roles: UserRoles[] = ['superadmin', 'admin', 'user']

function onUpdate(value: UserRoles | UserRoles[]) {
    emit('update', value)
}

watch(defaultValue!, () => {
    handleChange(defaultValue?.value)
})
</script>

<template>
    <Select
        v-model="value"
        v-model:inputValue="inputValue"
        :options="
            roles.map((role: UserRoles) => ({
                id: role,
                name: role,
            }))
        "
        :multiple="multiple"
        :as-input="asInput"
        :label="label"
        v-bind="$props"
        :error-message="errorMessage"
        @update:modelValue="onUpdate"
    />
</template>
