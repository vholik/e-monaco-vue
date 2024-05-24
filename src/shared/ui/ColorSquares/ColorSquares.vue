<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import cls from './ColorSquares.module.scss'

const colors = [
    'rgba(107, 70, 254, 0.1)',
    'rgba(107, 70, 254, 0.3)',
    'rgba(107, 70, 254, 0.5)',
    'rgba(107, 70, 254, 0.7)',
    'rgba(107, 70, 254, 0.9)',
]

const selectedColor = ref('')

const emits = defineEmits(['colorSelected'])

const selectColor = (color: string) => {
    selectedColor.value = color
    document.documentElement.style.setProperty(
        '--primary-variant-bg-marked-color',
        color,
    )
    emits('colorSelected', color)
}
</script>

<template>
    <div :class="cls.colorSquareContainer">
        <div
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            :class="cls.colorSquare"
            @click="selectColor(color)"
        ></div>
    </div>
</template>
