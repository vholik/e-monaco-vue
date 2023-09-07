<script setup lang="ts">
import Input from '@/shared/ui/Input/Input.vue'
import cls from './PriceInput.module.scss'
import { ref } from 'vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import CrossIcon from '@/shared/assets/icons/Cross.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'

let inputValue = ref(0)
let isSelected = ref(false)

function submit() {
    // TODO: add validation for inputValue
    isSelected.value = true
}

function removePrice() {
    // TODO: add api interaction
    isSelected.value = false
}
</script>

<template>
    <Input
        v-if="!isSelected"
        :class="cls.PriceInput"
        name="price"
        size="size_s"
        placeholder="Wpisz cenę"
        type="number"
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
            @click="removePrice"
        />
    </Flex>
</template>
