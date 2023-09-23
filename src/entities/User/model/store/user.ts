import { defineStore, type _GettersTree } from 'pinia'
import { type User } from '../types/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        user: null as null | User,
        inited: false,
    }),
    getters: {
        isUserLoggedIn: (state) => state.isLoggedIn,
        loggedInUser: (state) => state.user,
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
