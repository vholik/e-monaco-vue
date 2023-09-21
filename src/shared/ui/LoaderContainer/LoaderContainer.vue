<script setup lang="ts">
import cls from './LoaderContainer.module.scss'
// @ts-ignore
import Loader from 'vue-spinner/src/BeatLoader.vue'

interface Props {
    isLoading: boolean
}

defineProps<Props>()
</script>

<template>
    <div
        v-if="isLoading"
        :class="cls.LoaderContainer"
    >
        <Loader color="var(--primary-variant-color)" />
    </div>
    <div v-if="!isLoading">
        <slot></slot>
    </div>
</template>
