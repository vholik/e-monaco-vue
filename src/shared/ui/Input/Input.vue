<script setup lang="ts">
import { ref, toRefs } from 'vue'
import cls from './Input.module.scss'
import { useField } from 'vee-validate'
import SearchIcon from '@/shared/assets/icons/Search.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'

interface Props {
    size?: 'size_s' | 'size_m'
    modelValue?: string | number
    type?: string
    value?: string | number
    name: string
    label?: string
    error?: string
    placeholder?: string
    variant?: 'primary' | 'secondary'
    withSearchIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
    error: '',
    variant: 'primary',
    size: 'size_m',
})

const { error, name, placeholder, type, variant, label, withSearchIcon } =
    toRefs(props)

const emit = defineEmits(['update:modelValue', 'onEnter'])

let isFocused = ref(false)

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
} = useField(name, undefined, {
    initialValue: props.value,
})

function updateInput(e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
    handleChange(e)
}

function onBlur(e: Event) {
    handleBlur(e)
    isFocused.value = false
}
function onFocus() {
    isFocused.value = true
}

function onEnter() {
    emit('onEnter')
}
</script>

<template>
    <label :class="cls.label">
        {{ label }}
        <Flex
            :class="[
                cls.inputWrapper,
                cls[variant],
                cls[size],
                { [cls.inputError]: error },
                { [cls.focused]: isFocused },
            ]"
            gap="6"
        >
            <Icon
                :icon="SearchIcon"
                color="quatinary"
                v-if="withSearchIcon"
            />
            <input
                :class="cls.Input"
                :placeholder="placeholder"
                :name="name"
                :id="name"
                :type="type"
                :value="inputValue"
                @input="updateInput"
                @blur="onBlur"
                @focus="onFocus"
                @keyup.enter="onEnter"
            />
        </Flex>
        <p
            v-if="errorMessage"
            :class="cls.error"
        >
            {{ errorMessage }}
        </p>
    </label>
</template>

<style scoped></style>
