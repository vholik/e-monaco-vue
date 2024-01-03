import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        screwed: localStorage.getItem('screwedSidebar') === 'true',
    }),
    getters: {
        isOpen(state) {
            return state.screwed
        },
    },
    actions: {
        toggle() {
            this.screwed = !this.screwed
            localStorage.setItem(
                'screwedSidebar',
                this.screwed ? 'true' : 'false',
            )
        },
    },
})
