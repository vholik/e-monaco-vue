import { createApp } from 'vue'
import App from './App.vue'
import '@/app/styles/index.scss'
import { router } from '@/app/config/router'
import { VueQueryPlugin } from 'vue-query'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
