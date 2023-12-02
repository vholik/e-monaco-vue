<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import cls from './Text.module.scss'

interface Props {
    size?: 'size_s' | 'size_m' | 'size_xl' | 'size_xxl'
    isTitle?: boolean
    alignCenter?: boolean
    weight?: 'regular' | 'medium' | 'bold' | 'superbold'
    color?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'quatinary'
        | 'quinary'
        | 'primary-variant'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'size_m',
    weight: 'regular',
    color: 'primary',
})

const { size, weight, color, alignCenter } = toRefs(props)

const classObject = reactive([
    [cls.Text],
    [cls[size.value]],
    [cls[weight.value]],
    [cls[color.value]],
    { [cls.alignCenter]: alignCenter },
])
</script>

<template>
    <h2
        v-if="isTitle"
        :class="classObject"
    >
        <slot></slot>
    </h2>
    <p
        v-else
        :class="classObject"
    >
        <slot></slot>
    </p>
</template>
