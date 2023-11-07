<script setup lang="ts">
import { watch, ref, toRefs } from 'vue'
import cls from './InputNipModal.module.scss'
import { useField } from 'vee-validate'
import SearchIcon from '@/shared/assets/icons/Search.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Error from '@/shared/ui/Error/Error.vue'

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

const unformattedValue = ref('')
let formattedValue = ref('')

watch(unformattedValue, (newValue) => {
    formattedValue.value = formatValue(newValue)
})

function formatValue(value: string): string {
    return value.replace(
        /(\d{3})(\d{3})?(\d{2})?(\d{2})?(\d{1})?/,
        (match, p1, p2, p3, p4, p5) => {
            let result = p1
            if (p2) result += `-${p2}`
            if (p3) result += `-${p3}`
            if (p4) result += `-${p4}`
            if (p5) result += `-${p5}`
            return result
        },
    )
}

function updateInput(e: Event) {
    const inputText = (e.target as HTMLInputElement).value
    const unformattedText = inputText.replace(/[^0-9]/g, '')

    unformattedValue.value = unformattedText

    if (unformattedText.length >= 3) {
        formattedValue.value = formatValue(unformattedText)
    }

    emit('update:modelValue', unformattedValue.value)

    if (unformattedText !== '') {
        handleChange(e)
    }
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
                v-if="withSearchIcon"
                :icon="SearchIcon"
                color="quatinary"
            />
            <input
                :id="name"
                :class="cls.InputNipModal"
                :placeholder="placeholder"
                :name="name"
                :type="type"
                :value="formattedValue"
                :maxlength="13"
                @keydown="(e) => e.stopPropagation()"
                @input="updateInput"
                @focus="onFocus"
                @blur="onBlur"
                @keyup.enter="onEnter"
            />
        </Flex>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </label>
</template>
