<script setup lang="ts">
import cls from './Sidebar.module.scss'
import Flex from '@/shared/ui/Flex/Flex.vue'
import Text from '@/shared/ui/Text/Text.vue'
import { sidebarItems } from '../model/consts/sidebarItems'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/entities/User'
import { computed } from 'vue'
import type { UserRoles } from '@/entities/User/model/types/roles'
import {
    USER_ACCESS_LOCALSTORAGE_KEY,
    USER_REFRESH_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage'

const allowedPaths: Record<UserRoles, string[]> = {
    admin: ['/dashboard', '/users', '/persons', '/municipalities'],
    user: ['/dashboard'],
    superadmin: ['/dashboard', '/users', '/persons', '/municipalities'],
}

const router = useRouter()
let currentPath = computed(() => router.currentRoute.value.path)

const userStore = useUserStore()

const filteredSidebarItems = computed(() => {
    const userRole = userStore.loggedInUser?.role || 'user'
    console.log('UserRole:', userRole)

    const allowedPathsForUser = allowedPaths[userRole]
    const userSidebarItems = sidebarItems.filter((item) =>
        allowedPathsForUser.includes(item.path),
    )

    return userSidebarItems.map((item) => ({
        ...item,
        allowed: allowedPathsForUser.includes(item.path),
    }))
})

function logout() {
    userStore.setUser(null)
    localStorage.removeItem(USER_ACCESS_LOCALSTORAGE_KEY)
    localStorage.removeItem(USER_REFRESH_LOCALSTORAGE_KEY)

    router.push('/login')
}
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
                >
                    {{ userStore.loggedInUser?.firstName }}
                    {{ userStore.loggedInUser?.lastName }}
                </Text>
                <Text
                    :class="cls.logoutButton"
                    color="primary-variant"
                    size="size_s"
                    weight="bold"
                    @click="logout"
                    >Wyloguj się</Text
                >
            </Flex>
            <Flex
                direction="column"
                align="start"
                :max="true"
                gap="2"
            >
                <template v-if="userStore.loggedInUser">
                    <template
                        v-for="item in filteredSidebarItems"
                        :key="item.path"
                    >
                        <template v-if="item.allowed">
                            <Flex
                                :class="[
                                    cls.sidebarItem,
                                    {
                                        [cls.activeItem]:
                                            item.path === currentPath,
                                    },
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
                                    >{{ item.name }}</Text
                                >
                            </Flex>
                        </template>
                    </template>
                </template>
            </Flex>
        </Flex>
    </div>
</template>
