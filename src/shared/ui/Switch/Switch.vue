<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue'
import cls from './Switch.module.scss'
import { useField } from 'vee-validate'

interface Props {
    size?: 'size_s' | 'size_m'
    modelValue?: boolean
    type?: string
    value?: string | number
    name: string
    label?: string
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    error: '',
    variant: 'primary',
    size: 'size_m',
})

const { error, name, label } = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const {
    value: inputValue,
    errorMessage,
    handleBlur,
} = useField(name, undefined, {
    initialValue: props.value,
})

let isFocused = ref(false)

const checked = ref(props.modelValue || false)

function onBlur(e: Event) {
    handleBlur(e)
    isFocused.value = false
}

function updateInput(e: Event) {
    e.preventDefault()
    checked.value = !checked.value
    emit('update:modelValue', checked.value)
}

onMounted(() => {
    const localStorageValue = localStorage.getItem(`switch_${name.value}`)
    if (localStorageValue !== null) {
        checked.value = localStorageValue === 'true'
    }
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
