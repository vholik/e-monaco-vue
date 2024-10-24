<script setup lang="ts">
import { toRefs } from 'vue'
import cls from './Button.module.scss'

interface Props {
    size?: 'size_m' | 'size_xl' | 'size_s'
    variant?: 'primary' | 'secondary'
    max?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'size_m',
    variant: 'primary',
    max: true,
})

const { variant, size, max } = toRefs(props)
</script>

<template>
    <button :class="[cls.Button, cls[size], cls[variant], { [cls.max]: max }]">
        <slot></slot>
    </button>
</template>
