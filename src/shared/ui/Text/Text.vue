<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import cls from './Text.module.scss'

interface Props {
    size?: 'size_s' | 'size_m' | 'size_xl' | 'size_xxl'
    isTitle?: boolean
    weight?: 'regular' | 'medium' | 'bold' | 'superbold'
    color?: 'primary' | 'secondary' | 'tertiary' | 'quatinary' | 'quinary'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'size_m',
    weight: 'regular',
    color: 'primary',
})

const { size, weight, color } = toRefs(props)

const classObject = reactive([
    [cls.Text],
    [cls[size.value]],
    [cls[weight.value]],
    [cls[color.value]],
])
</script>

<template>
    <h2
        :class="classObject"
        v-if="isTitle"
    >
        <slot></slot>
    </h2>
    <p
        :class="classObject"
        v-else
    >
        <slot></slot>
    </p>
</template>
