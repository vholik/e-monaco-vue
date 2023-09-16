<script setup lang="ts">
import type { SelectOption } from '@/shared/ui/Select/types'
import cls from './UserSelect.module.scss'
import Select from '@/shared/ui/Select/Select.vue'
import { toRefs } from 'vue'
import { useField } from 'vee-validate'
import { useOwners } from '../../model/services/useOwners'

const options: SelectOption[] = [
    { id: '1', name: 'Viktor Holik' },
    { id: '2', name: 'Dawid Polański' },
]

const { isLoading, data: users } = useOwners()

interface Props {
    asInput?: boolean
    label?: string
    name: string
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const { errorMessage, value } = useField(name, undefined, {
    initialValue: options[0].id,
})
</script>

<template>
    <div :class="cls.UserSelect">
        <Select
            v-model="value"
            :options="options"
            :withAvatar="true"
            :asInput="asInput"
            :label="label"
            v-bind="$props"
            :errorMessage="errorMessage"
        />
    </div>
</template>
../../model/services/users
