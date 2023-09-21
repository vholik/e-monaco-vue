<script setup lang="ts">
import cls from './Sidebar.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'
import { sidebarItems } from '../model/consts/sidebarItems'
import { useRouter } from 'vue-router'

const router = useRouter()
let currentPath = router.currentRoute.value.path
</script>

<template>
    <div :class="cls.Sidebar">
        <Flex
            direction="column"
            gap="8"
            align="start"
        >
            <Flex gap="4">
                <div :class="cls.userIcon">VH</div>
                <Text
                    size="size_s"
                    weight="bold"
                    >Zespół CIG Podatek</Text
                >
            </Flex>
            <Flex
                direction="column"
                align="start"
                :max="true"
                gap="2"
            >
                <Flex
                    v-for="item in sidebarItems"
                    :key="item.path"
                    :class="[
                        cls.sidebarItem,
                        { [cls.activeItem]: item.path === currentPath },
                    ]"
                    :max="true"
                    gap="4"
                >
                    <component :is="item.icon" />
                    <Text
                        size="size_s"
                        weight="medium"
                        color="secondary"
                    >
                        {{ item.name }}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    </div>
</template>
