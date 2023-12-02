<script setup lang="ts">
import cls from './DeleteButton.module.scss'
import Delete from '@/shared/assets/icons/Delete.vue'
</script>

<template>
    <button :class="cls.Button">
        <Delete />
    </button>
</template>
