import { $api } from '@/shared/api/api'
import { useMutation } from 'vue-query'
import type { AuthData, AuthReponse } from '../types/auth'
import {
    REFRESH_USER_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage'
import { useUserStore } from '@/entities/User'
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
            onSuccess: (data) => {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, data.accessToken)
                localStorage.setItem(
                    REFRESH_USER_LOCALSTORAGE_KEY,
                    data.refreshToken,
                )
                userStore.setIsLoggedIn(true)
                router.push('/dashboard')
            },
        },
    )
}
