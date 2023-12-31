import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import type { AuthData, AuthReponse } from '../types/auth'
import {
    USER_REFRESH_LOCALSTORAGE_KEY,
    USER_ACCESS_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage'
import { useUserStore, type User } from '@/entities/User'
import { useRouter } from 'vue-router'

export const useLogin = () => {
    const userStore = useUserStore()
    const router = useRouter()

    return useMutation(
        ['login'],
        async (data: AuthData) => {
            const response = await $api.post<AuthReponse>(
                'authentication/signin',
                data,
            )

            return response.data
        },
        {
            onSuccess: async (data) => {
                localStorage.setItem(
                    USER_ACCESS_LOCALSTORAGE_KEY,
                    data.accessToken,
                )
                localStorage.setItem(
                    USER_REFRESH_LOCALSTORAGE_KEY,
                    data.refreshToken,
                )
                userStore.setIsLoggedIn(true)

                const res = await $api.get<User>('authentication/me')

                userStore.setUser(res.data)
                userStore.setInited()
                router.push('/dashboard')
            },
        },
    )
}
