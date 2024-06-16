<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './NipInput.module.scss'
import { onMounted, ref, toRefs, watch } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

const inputValue = ref<string>('')
const isSelected = ref(false)

interface Props {
    defaultValue?: string
    validateFn?: (value: string) => boolean
    placeholder?: string
}

const props = defineProps<Props>()
const { defaultValue, validateFn } = toRefs(props)

const emit = defineEmits(['update'])

function initDefaultValue() {
    if (defaultValue?.value) {
        isSelected.value = true
        inputValue.value = defaultValue.value
    } else {
        isSelected.value = false
        inputValue.value = ''
    }
}

onMounted(initDefaultValue)
watch(defaultValue, initDefaultValue)

function submit() {
    if (validateFn?.value && !validateFn.value(inputValue.value)) {
        return
    }

    emit('update', inputValue.value)
    isSelected.value = true
}

function removeText() {
    emit('update', null)
    inputValue.value = ''
    isSelected.value = false
}

function editNip() {
    isSelected.value = false
}

function handleInput(event: InputEvent) {
    const unformattedValue = inputValue.value.replace(/[-\D]/g, '')

    if (/^\d+$/.test(unformattedValue)) {
        const formattedValue = unformattedValue.replace(
            /^(\d{3})(\d{3})(\d{2})(\d{2})$/,
            (match, p1, p2, p3, p4) => {
                let result = p1
                if (p2) result += '-' + p2
                if (p3) result += '-' + p3
                if (p4) result += '-' + p4
                return result
            },
        )

        inputValue.value = formattedValue
    }
}

function formatNip(value: string) {
    return value.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1-$2-$3-$4')
}
</script>

<template>
    <div>
        <Input
            v-if="!isSelected"
            v-model="inputValue"
            :class="cls.NipInput"
            name="nip"
            size="size_s"
            :placeholder="placeholder || 'Wpisz NIP'"
            @input="handleInput"
            @onEnter="submit"
        />
        <Flex
            v-else
            gap="2"
        >
            <Text
                size="size_s"
                :class="cls.text"
                @dblclick="editNip"
                >{{ formatNip(inputValue) }}</Text
            >
            <Icon
                :class="cls.cancel"
                :icon="CrossIcon"
                color="quatinary"
                @click="removeText"
            />
        </Flex>
    </div>
</template>
