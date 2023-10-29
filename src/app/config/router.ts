import { LoginPage } from '@/pages/Login'
import { DashboardPage } from '@/pages/Dashboard'
import { ContactPersonsPage } from '@/pages/ContactPersons'
import { UsersPage } from '@/pages/Users'
import { MunicipalitiesPage } from '@/pages/Municipalities'
import { Sidebar } from '@/widgets/Sidebar'
import { createRouter, createWebHistory } from 'vue-router'

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    USERS = 'users',
    PERSONS = 'persons',
    MUNICIPALITIES = 'munucipalities',
}

export const getRouteMain = () => '/dashboard'
export const getRouteLogin = () => '/login'
export const getRouteUsers = () => '/users'
export const getRouteContactPersons = () => '/persons'
export const getRouteMunicipalities = () => '/municipalities'

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
    {
        path: getRouteContactPersons(),
        components: {
            sidebar: Sidebar,
            default: ContactPersonsPage,
        },
    },
    {
        path: getRouteMunicipalities(),
        components: {
            sidebar: Sidebar,
            default: MunicipalitiesPage,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }
