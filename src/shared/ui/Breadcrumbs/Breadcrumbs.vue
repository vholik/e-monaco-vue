<script setup lang="ts">
import type { BreadcrumbsItem } from '@/shared/types/breadcrumbs'
import cls from './Breadcrumbs.module.scss'
import Text from '@/shared/ui/Text/Text.vue'
import Flex from '@/shared/ui/Flex/Flex.vue'
import ChevronRight from '@/shared/assets/icons/ChevronRight.vue'
import { useRouter } from 'vue-router'

interface Props {
    items: BreadcrumbsItem[]
}

const router = useRouter()
let currentPath = router.currentRoute.value.path

defineProps<Props>()
</script>

<template>
    <ul :class="cls.Breadcrumbs">
        <Flex gap="4">
            <Flex
                gap="4"
                v-for="(item, index) in items"
                :key="item.path"
            >
                <RouterLink
                    :to="item.path"
                    :disabled="true"
                >
                    <Text
                        size="size_xl"
                        weight="superbold"
                        :color="
                            currentPath === item.path ? 'primary' : 'quatinary'
                        "
                        >{{ item.name }}</Text
                    >
                </RouterLink>
                <ChevronRight v-if="index !== items.length - 1" />
            </Flex>
        </Flex>
    </ul>
</template>
