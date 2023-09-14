import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { Sidebar } from '@/widgets/Sidebar'
import { createRouter, createWebHistory } from 'vue-router'

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
}

export const getRouteMain = () => '/dashboard'
export const getRouteLogin = () => '/login'

const routes = [
    {
        path: getRouteMain(),
        components: {
            default: Sidebar,
            dashboard: DashboardPage,
        },
    },
    { path: getRouteLogin(), component: LoginPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }
