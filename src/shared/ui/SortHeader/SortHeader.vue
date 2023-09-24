<script setup lang="ts">
import Icon from '@/shared/ui/Icon/Icon.vue'
import cls from './SortHeader.module.scss'
import ArrowUpIcon from '@/shared/assets/icons/ArrowUp.vue'

import Text from '@/shared/ui/Text/Text.vue'
import Flex from '../Flex/Flex.vue'
import { toRefs, type Component } from 'vue'
import type { Order } from '@/shared/types/order'

interface Props {
    name: string
    value?: null | Order
    state?: boolean
    canSort?: boolean
    filter?: Component
}

const emit = defineEmits(['update'])

const props = withDefaults(defineProps<Props>(), {
    canSort: true,
})

const { value } = toRefs(props)

function changeOrder() {
    switch (value?.value) {
        case 'asc':
            emit('update', 'desc')
            break
        case 'desc':
            emit('update', 'asc')
            break
        case null:
            emit('update', 'desc')
            break
    }
}
</script>

<template>
    <Flex
        gap="4"
        align="center"
    >
        <component :is="filter" />
        <Text
            :class="[cls.SortHeader, { [cls.disabled]: !canSort }]"
            color="quatinary"
            weight="medium"
            @click="changeOrder"
        >
            {{ name }}
        </Text>
        <Icon
            v-if="canSort"
            :class="{ [cls.ascending]: value === 'desc' }"
            :icon="ArrowUpIcon"
            color="quatinary"
        />
    </Flex>
</template>
