<script setup lang="ts">
import cls from './Sidebar.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'
import { sidebarItems } from '../model/consts/sidebarItems'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/User'
import { computed } from 'vue'

const router = useRouter()
let currentPath = computed(() => router.currentRoute.value.path)

const userStore = useUserStore()
</script>

<template>
    <div :class="cls.Sidebar">
        <Flex
            direction="column"
            gap="8"
            align="start"
        >
            <Flex gap="4">
                <div :class="cls.userIcon">
                    {{ userStore.loggedInUser?.firstName[0]
                    }}{{ userStore.loggedInUser?.lastName[0] }}
                </div>
                <Text
                    size="size_s"
                    weight="bold"
                    >{{ userStore.loggedInUser?.firstName }}
                    {{ userStore.loggedInUser?.lastName }}</Text
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
                    @click="router.push(item.path)"
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
