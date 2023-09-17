<script setup lang="ts">
import cls from './Error.module.scss'

interface Props {
    value: string
}

defineProps<Props>()
</script>

<template>
    <p :class="cls.Error">
        {{ value }}
    </p>
</template>
