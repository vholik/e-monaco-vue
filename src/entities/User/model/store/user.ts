import { defineStore, type _GettersTree } from 'pinia'
import type { User } from '../../../Status/types/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        user: null as null | User,
        inited: false,
    }),
    getters: {
        isUserLoggedIn: (state) => state.isLoggedIn,
    },
    actions: {
        setIsLoggedIn(value: boolean) {
            this.isLoggedIn = value
        },
        setUser(value: User) {
            this.user = value
        },
        setInited() {
            this.inited = true
        },
    },
})
