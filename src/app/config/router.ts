import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { UsersPage } from '@/pages/Users'
import { Sidebar } from '@/widgets/Sidebar'
import { createRouter, createWebHistory } from 'vue-router'

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    USERS = 'users',
}

export const getRouteMain = () => '/dashboard'
export const getRouteLogin = () => '/login'
export const getRouteUsers = () => '/users'

const routes = [
    { path: '/', components: LoginPage },
    {
        path: getRouteMain(),
        components: {
            sidebar: Sidebar,
            default: DashboardPage,
        },
    },
    { path: getRouteLogin(), component: LoginPage },
    {
        path: getRouteUsers(),
        components: {
            sidebar: Sidebar,
            default: UsersPage,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }
