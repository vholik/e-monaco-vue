<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './CommentInput.module.scss'
import { onMounted, ref, toRefs } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

let inputValue = ref('')
let isSelected = ref(false)

interface Props {
    defaultValue?: string
    onChangeFn: (value: string | null) => void
    validateFn?: (value: string) => boolean
    placeholder?: string
}

const props = defineProps<Props>()

const { defaultValue, onChangeFn, validateFn } = toRefs(props)

onMounted(() => {
    if (defaultValue?.value) {
        isSelected.value = true
        inputValue.value = defaultValue.value
    }
})

function submit() {
    if (validateFn?.value && !validateFn.value(inputValue.value)) {
        return
    }

    onChangeFn.value(inputValue.value)
    isSelected.value = true
}

function removeText() {
    onChangeFn.value(null)
    isSelected.value = false
}
</script>

<template>
    <Input
        v-if="!isSelected"
        v-model="inputValue"
        :class="cls.CommentInput"
        name="price"
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
            :class="cls.text"
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
