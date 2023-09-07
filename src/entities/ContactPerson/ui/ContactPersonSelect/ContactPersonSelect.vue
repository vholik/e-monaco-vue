<script setup lang="ts">
import { ref } from 'vue'
import cls from './ContactPersonSelect.module.scss'
import Select from '@/shared/ui/Select/Select.vue'

let value = ref([])

const options = [
    {
        id: '1',
        name: 'siema',
    },
    {
        id: '2',
        name: 'wow',
    },
]
</script>

<template>
    <div :class="cls.ContactPersonSelect">
        <Select
            v-model="value"
            :options="options"
            multiple
        />
    </div>
</template>
