import { createApp } from 'vue'
import App from './App.vue'
import '@/app/styles/index.scss'
import { router } from '@/app/config/router'
import { VueQueryPlugin } from 'vue-query'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import FloatingVue from 'floating-vue'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                
            },
        },
    },
})
app.use(FloatingVue)

app.use(Toast)

// Ensure that user is authenticated if not - redirect to login
// router.beforeEach(async (to, from, next) => {
//     const store = useUserStore()

//     if (!store.isUserLoggedIn && store.inited && to.path !== '/login') {
//         return next('/login')
//     }

//     next()
// })

app.mount('#app')
