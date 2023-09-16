import axios from 'axios'

import {
    USER_ACCESS_LOCALSTORAGE_KEY,
    USER_REFRESH_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage'

export const $api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        const token = localStorage.getItem(USER_ACCESS_LOCALSTORAGE_KEY)

        let bearerToken = token ? `Bearer ${token}` : null

        config.headers.Authorization = bearerToken
    }

    return config
})

export const fetchRefreshToken = async () => {
    const response = await axios.get(
        // using axios instead of $api to remove infinite requests
        `${import.meta.env.VITE_SERVER_BASE_URL}/authentication/refresh`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    USER_REFRESH_LOCALSTORAGE_KEY,
                )}`,
            },
        },
    )

    return response.data
}

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                const response = await fetchRefreshToken()

                localStorage.setItem(
                    USER_ACCESS_LOCALSTORAGE_KEY,
                    response.accessToken,
                )
                localStorage.setItem(
                    USER_REFRESH_LOCALSTORAGE_KEY,
                    response.refreshToken,
                )

                return $api.request(originalRequest)
            } catch (e) {
                return e
            }
        }
        throw error
    },
)
