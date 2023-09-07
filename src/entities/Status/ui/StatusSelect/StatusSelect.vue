<script setup lang="ts">
import type { SelectOption } from '@/shared/ui/Select/types'
import cls from './StatusSelect.module.scss'
import Select from '@/shared/ui/Select/Select.vue'
import { ref } from 'vue'

const options: SelectOption[] = [
    {
        id: 'asfsdf',
        name: 'Podpisał umowę',
        bgColor: 'var(--status-green-bg-color)',
        color: 'var(--status-green-color)',
    },
    {
        id: '24234',
        name: 'Podpisał umowę i zwiał',
        bgColor: 'var(--status-orange-bg-color)',
        color: 'var(--status-orange-color)',
    },
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
        />
    </div>
</template>
