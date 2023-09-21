<script setup lang="ts">
import { toRefs } from 'vue'
import cls from './ActionLink.module.scss'

interface Props {
    onClickFn?: () => void
}

const props = defineProps<Props>()

const { onClickFn } = toRefs(props)

function onClick() {
    onClickFn?.value?.()
}
</script>

<template>
    <a
        :class="cls.ActionLink"
        @click="onClick"
    >
        <slot></slot>
    </a>
</template>
