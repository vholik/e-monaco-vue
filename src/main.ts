import { createApp } from 'vue'
import App from './App.vue'
import '@/app/styles/index.scss'
import { router } from '@/app/config/router'
import { VueQueryPlugin } from 'vue-query'
import { createPinia } from 'pinia'
import { useUserStore } from '@/entities/User'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)

// Ensure that user is authenticated if not - redirect to login
// router.beforeEach(async (to, from) => {
//     const store = useUserStore()

//     if (!store.isUserLoggedIn && to.path !== '/login') return '/login'
// })

app.mount('#app')
