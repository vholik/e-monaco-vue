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
}

const props = defineProps<Props>()

const { name } = toRefs(props)

const { errorMessage, value } = useField<string>(name, undefined, {})
</script>

<template>
    <div :class="cls.UserSelect">
        <Select
            v-model="value"
            :options="
                data.map((it: User) => ({
                    id: it.id,
                    name: [it.firstName, it.lastName || ''].join(' '),
                }))
            "
            :withAvatar="true"
            :asInput="asInput"
            :label="label"
            v-bind="$props"
            :errorMessage="errorMessage"
        />
    </div>
</template>
