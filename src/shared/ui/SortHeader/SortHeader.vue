<script setup lang="ts">
import Icon from '@/shared/ui/Icon/Icon.vue'
import cls from './SortHeader.module.scss'
import ArrowUpIcon from '@/shared/assets/icons/ArrowUp.vue'

import Text from '@/shared/ui/Text/Text.vue'
import Flex from '../Flex/Flex.vue'
import type { Component } from 'vue'
import type { Order } from '@/shared/types/order'

interface Props {
    name: string
    value?: null | Order
    state?: boolean
    canSort?: boolean
    filter?: Component
}

withDefaults(defineProps<Props>(), {
    canSort: true,
})
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
        >
            {{ name }}
        </Text>
        <Icon
            v-if="canSort"
            :icon="ArrowUpIcon"
            color="quatinary"
        />
    </Flex>
</template>
