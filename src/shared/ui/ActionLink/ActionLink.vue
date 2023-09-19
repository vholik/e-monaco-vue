<script setup lang="ts">
import cls from './ActionLink.module.scss'
</script>

<template>
    <a :class="cls.ActionLink">
        <slot></slot>
    </a>
</template>
