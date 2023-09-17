<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './CommentInput.module.scss'
import { onMounted, ref, toRefs } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'
import { useToast } from 'vue-toastification'

let inputValue = ref('')
let isSelected = ref(false)
const toast = useToast()

interface Props {
    defaultValue?: string
    onChangeFn: (value: string | null) => void
    validateFn?: (value: string) => boolean
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
        :class="cls.CommentInput"
        name="price"
        size="size_s"
        placeholder="..."
        v-model="inputValue"
        @onEnter="submit"
    />
    <Flex
        gap="2"
        v-else
    >
        <Text size="size_s">{{ inputValue }}</Text>
        <Icon
            :class="cls.cancel"
            :icon="CrossIcon"
            color="quatinary"
            @click="removeText"
        />
    </Flex>
</template>
