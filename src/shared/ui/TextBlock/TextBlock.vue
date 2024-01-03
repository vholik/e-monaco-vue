<script setup lang="ts">
import cls from './TextBlock.module.scss'
</script>

<template>
    <div :class="cls.TextBlock">
        <slot />
    </div>
</template>
