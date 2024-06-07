<script setup lang="ts">
import { toRefs } from 'vue'
import cls from './UpdatePassButton.module.scss'
import UpdatePass from '@/shared/assets/icons/UpdatePass.vue'

interface Props {
    size?: 'size_m' | 'size_xl'
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
        <UpdatePass class="icon" />
    </button>
</template>
