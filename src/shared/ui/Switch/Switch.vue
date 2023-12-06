<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue'
import cls from './Switch.module.scss'
import { useField } from 'vee-validate'

interface Props {
    size?: 'size_s' | 'size_m'
    modelValue?: boolean
    name: string
    label?: string
    error?: string
}

const { error, name, label, modelValue } = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])

let isFocused = ref(false)
const checked = ref(modelValue || false)

function updateInput(e: Event) {
    e.preventDefault()
    checked.value = !checked.value
    emit('update:modelValue', checked.value)
}

onMounted(() => {
    checked.value = modelValue || false
})
</script>

<template>
    <label :class="cls.label">
        {{ label }}
        <div :class="[{ [cls.inputError]: error }]">
            <button
                :class="{
                    [cls.customSwitch]: true,
                    [cls.checked]: checked,
                }"
                @click.prevent="updateInput"
            >
                <span :class="{ [cls.active]: checked }" />
            </button>
        </div>
        <div
            v-if="error"
            class="error-message"
        >
            {{ error }}
        </div>
    </label>
</template>
