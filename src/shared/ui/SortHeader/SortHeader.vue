<script setup lang="ts">
import Icon from '@/shared/ui/Icon/Icon.vue'
import cls from './SortHeader.module.scss'
import ArrowUpIcon from '@/shared/assets/icons/ArrowUp.vue'

import Text from '@/shared/ui/Text/Text.vue'
import Flex from '../Flex/Flex.vue'

interface Props {
    name: string
    value: string
    state?: boolean
    canSort?: boolean
}

withDefaults(defineProps<Props>(), {
    canSort: true,
})
</script>

<template>
    <Flex gap="4">
        <Text
            :class="[cls.SortHeader, { [cls.disabled]: !canSort }]"
            color="quatinary"
            weight="medium"
        >
            {{ name }}
        </Text>
        <Icon
            :icon="ArrowUpIcon"
            color="quatinary"
            v-if="canSort"
        />
    </Flex>
</template>
