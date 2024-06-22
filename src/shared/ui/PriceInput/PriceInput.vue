<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './PriceInput.module.scss'
import { onMounted, ref, watch, defineProps, defineEmits } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

const { defaultValue, withPrice } = defineProps({
    defaultValue: Number,
    withPrice: Boolean,
})

const emit = defineEmits(['update'])

const inputValue = ref<number | null>(null)
const isSelected = ref(false)

const initDefaultValue = () => {
    isSelected.value = defaultValue !== null && defaultValue !== undefined
    inputValue.value = defaultValue ?? null
}

onMounted(initDefaultValue)

watch(() => defaultValue, initDefaultValue)

function submit() {
    emit('update', inputValue.value)
    isSelected.value = true
}

const removePrice = () => {
    emit('update', null)
    inputValue.value = null
    isSelected.value = false
}

const editPrice = () => {
    inputValue.value = defaultValue ?? null
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
        <Text
            size="size_s"
            @dblclick="editPrice"
            >{{ inputValue }}</Text
        >
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
