<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './PriceInput.module.scss'
import { onMounted, ref, toRefs } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

let inputValue = ref(0)
let isSelected = ref(false)

interface Props {
    defaultValue?: number
    onChangeFn: (value: number | null) => void
}

const props = defineProps<Props>()

const { defaultValue, onChangeFn } = toRefs(props)

onMounted(() => {
    if (defaultValue?.value) {
        isSelected.value = true
        inputValue.value = defaultValue.value
    }
})

function submit() {
    onChangeFn.value(inputValue.value)
    isSelected.value = true
}

function removePrice() {
    onChangeFn.value(null)
    isSelected.value = false
}
</script>

<template>
    <Input
        v-if="!isSelected"
        v-model="inputValue"
        :class="cls.PriceInput"
        name="price"
        size="size_s"
        placeholder="Wartość całkowita"
        type="number"
        @onEnter="submit"
    />
    <Flex
        v-else
        gap="2"
    >
        <Text size="size_s">{{ inputValue }}</Text>
        <Icon
            :class="cls.cancel"
            :icon="CrossIcon"
            color="quatinary"
            @click="removePrice"
        />
    </Flex>
</template>
