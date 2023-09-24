<script setup lang="ts">
import SortIcon from '@/shared/assets/icons/Sort.vue'
import Icon from '@/shared/ui/Icon/Icon.vue'
import Popover from '@/shared/ui/Popover/Popover.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
</script>

<template>
    <Popover>
        <Icon
            cursor-pointer
            :icon="SortIcon"
            color="quatinary"
        />
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
