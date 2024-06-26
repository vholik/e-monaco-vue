<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './CommentInput.module.scss'
import { onMounted, ref, toRefs, watch } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

interface Props {
    defaultValue?: string
    validateFn?: (value: string) => boolean
    placeholder?: string
    className?: string
}

const props = defineProps<Props>()
const { defaultValue, validateFn, className } = toRefs(props)

const emit = defineEmits(['update'])

const inputValue = ref<string>('')
const isSelected = ref(false)

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

function removeText(e: Event) {
    e.stopPropagation()
    emit('update', null)
    inputValue.value = ''
    isSelected.value = false
}

function editComment() {
    isSelected.value = false
}
</script>

<template>
    <Input
        v-if="!isSelected"
        v-model="inputValue"
        :class="[cls.CommentInput, className]"
        name="comment"
        size="size_s"
        :placeholder="placeholder || 'Wpisz'"
        @onEnter="submit"
    />
    <Flex
        v-else
        gap="2"
    >
        <Text
            size="size_s"
            :class="[cls.text, className]"
            @dblclick="editComment"
            >{{ inputValue }}</Text
        >
        <Icon
            :class="cls.cancel"
            :icon="CrossIcon"
            color="quatinary"
            @click="removeText"
        />
    </Flex>
</template>
