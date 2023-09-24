<script setup lang="ts">
import FilterIcon from '@/shared/assets/icons/Filter.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Popover from '@/shared/ui/Popover/Popover.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import cls from './FilterHeader.module.scss'

interface Props {
    selectedCount?: number
}

defineProps<Props>()
</script>

<template>
    <Popover>
        <Flex gap="2">
            <div
                v-if="selectedCount"
                :class="cls.count"
            >
                {{ selectedCount }}
            </div>
            <Icon
                cursor-pointer
                :icon="FilterIcon"
                color="quatinary"
            />
        </Flex>

        <template #content>
            <Flex
                gap="2"
                direction="column"
                align="start"
            >
                Filtruj według:
                <slot />
            </Flex>
        </template>
    </Popover>
</template>
