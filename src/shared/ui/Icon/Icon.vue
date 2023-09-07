<script setup lang="ts">
import { toRefs } from 'vue'
import cls from './Icon.module.scss'

interface Props {
    icon: any
    color?:
        | 'primary'
        | 'primary-variant'
        | 'secondary'
        | 'tertiary'
        | 'quatinary'
        | 'quinary'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'primary',
})

const { color } = toRefs(props)
</script>

<template>
    <component
        :is="icon"
        :class="[cls.Icon, cls[color]]"
    />
</template>
