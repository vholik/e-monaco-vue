<script setup lang="ts">
import type { SelectOption } from '@/shared/ui/Select/types'
import cls from './UserSelect.module.scss'
import Select from '@/shared/ui/Select/Select.vue'
import { ref } from 'vue'

const options: SelectOption[] = [
    { id: '1', name: 'Viktor Holik' },
    { id: '2', name: 'Dawid Polański' },
]

let currentOption = ref(options[0])
</script>

<template>
    <div
        :class="cls.StatusSelect"
        :name="currentOption.id"
    >
        <Select
            v-model="currentOption"
            :options="options"
            :withAvatar="true"
        />
    </div>
</template>
