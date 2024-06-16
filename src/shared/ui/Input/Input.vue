<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import cls from './Input.module.scss'
import { useField } from 'vee-validate'
import SearchIcon from '@/shared/assets/icons/Search.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Error from '@/shared/ui/Error/Error.vue'

const props = defineProps({
    size: {
        type: String as () => 'size_s' | 'size_m',
        default: 'size_m',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    name: {
        type: String,
        required: true,
    },
    label: String,
    error: String,
    placeholder: {
        type: String,
        default: '',
    },
    variant: {
        type: String as () => 'primary' | 'secondary',
        default: 'primary',
    },
    withSearchIcon: Boolean,
})

const emit = defineEmits(['update:modelValue', 'onEnter'])

const isFocused = ref(false)

const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
} = useField(props.name, undefined, {
    initialValue: props.modelValue,
})

watch(
    () => props.modelValue,
    (newValue) => {
        inputValue.value = newValue
    },
)

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
                { [cls.inputError]: error },
                { [cls.focused]: isFocused },
                { [cls.withSearchIcon]: withSearchIcon },
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
                :class="[
                    cls.Input,
                    cls[size],
                    {
                        [cls.withSearchIcon]: withSearchIcon,
                    },
                ]"
                :placeholder="placeholder"
                :name="name"
                :type="type"
                v-model="inputValue"
                @keydown="(e) => e.stopPropagation()"
                @input="updateInput"
                @blur="onBlur"
                @focus="onFocus"
                @keyup.enter="onEnter"
            />
        </Flex>
        <Error
            v-if="errorMessage"
            :value="errorMessage"
        />
    </label>
</template>
