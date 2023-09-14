import { defineStore } from 'pinia'

export interface UserStore {
    isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
    state: () => ({ isLoggedIn: false }),
    getters: {
        isUserLoggedIn: (state) => state.isLoggedIn,
    },
    actions: {
        setIsLoggedIn(value: boolean) {
            this.isLoggedIn = value
        },
    },
})
