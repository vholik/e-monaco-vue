<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './PriceInput.module.scss'
import { onMounted, ref, toRefs, watch } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

let inputValue = ref(0)
let isSelected = ref(false)

interface Props {
    defaultValue?: number
    withPrice?: boolean
}

const props = defineProps<Props>()

const { defaultValue } = toRefs(props)

const emit = defineEmits(['update'])

function initDefaultValue() {
    isSelected.value = !!defaultValue?.value
    inputValue.value = defaultValue?.value || 0
}

onMounted(initDefaultValue)

watch(defaultValue!, initDefaultValue)

function submit() {
    emit('update', inputValue.value)
    isSelected.value = true
}

function removePrice() {
    emit('update', null)
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
        <Text
            v-if="withPrice"
            size="size_s"
            >zł</Text
        >
        <Icon
            :class="cls.cancel"
            :icon="CrossIcon"
            color="quatinary"
            @click="removePrice"
        />
    </Flex>
</template>
