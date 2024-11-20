<script setup lang="ts">
import cls from './DeleteButton.module.scss'
import Delete from '@/shared/assets/icons/Delete.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['confirmDelete'])

const handleDeleteClick = () => {
    emit('confirmDelete')
}
</script>

<template>
    <button
        :class="cls.Button"
        @click="handleDeleteClick"
    >
        <Delete />
    </button>
</template>
