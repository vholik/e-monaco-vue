<script setup lang="ts">
import { useQueryProvider } from 'vue-query'
import { onMounted } from 'vue'
import { $api } from '@/shared/api/api'
import { useUserStore, type User } from './entities/User'
import {
    USER_ACCESS_LOCALSTORAGE_KEY,
    USER_REFRESH_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage'
import { useRouter } from 'vue-router'
import 'floating-vue/dist/style.css'
import { storeToRefs } from 'pinia'

useQueryProvider()

const router = useRouter()
const userStore = useUserStore()
const { inited } = storeToRefs(userStore)

async function getUser() {
    const res = await $api.get<User>('authentication/me')

    const pathname = router.currentRoute.value.fullPath

    if (res.data) {
        userStore.setUser(res.data)
        if (pathname === '/') {
            await router.push('/dashboard')
        }
    } else {
        localStorage.removeItem(USER_ACCESS_LOCALSTORAGE_KEY)
        localStorage.removeItem(USER_REFRESH_LOCALSTORAGE_KEY)
        await router.push('/login')
    }

    userStore.setInited()
}

onMounted(() => {
    getUser()
})
</script>

<template>
    <router-view name="sidebar"></router-view>
    <router-view v-if="inited"></router-view>
</template>

<style scoped></style>
