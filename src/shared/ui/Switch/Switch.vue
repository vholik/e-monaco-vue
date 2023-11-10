<script setup lang="ts">
import { ref, toRefs } from 'vue'
import cls from './Switch.module.scss'
import { useField } from 'vee-validate'
import Flex from '@/shared/ui/Flex/Flex.vue'

const modelValue = ref(false)

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

let isFocused = ref(false)

const {
    value: inputValue,
    errorMessage,
    handleBlur,
} = useField(name, undefined, {
    initialValue: props.value,
})

function onBlur(e: Event) {
    handleBlur(e)
    isFocused.value = false
}

function updateInput(e: Event) {
    e.preventDefault()
    const newValue = !modelValue.value
    modelValue.value = newValue
    console.log('Switch - updateInput - modelValue:', modelValue.value)
    emit('update:modelValue', newValue)
}
</script>

<template>
    <label :class="cls.label">
        {{ label }}
        <Flex
            :class="[
                cls[size],
                { [cls.inputError]: error },
                { [cls.focused]: isFocused },
            ]"
            gap="6"
        >
            <button
                :class="{
                    [cls.customSwitch]: true,
                    [cls.checked]: modelValue,
                }"
                @click.prevent="updateInput"
            >
                <span :class="{ [cls.active]: modelValue }" />
            </button>
        </Flex>
        <div
            v-if="errorMessage"
            class="error-message"
        >
            {{ errorMessage }}
        </div>
    </label>
</template>
