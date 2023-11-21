import HomeIcon from '@/shared/assets/icons/Home.vue'
import UsersIcon from '@/shared/assets/icons/Users.vue'

// TODO: change pathes

export const sidebarItems = [
    {
        name: 'Strona główna',
        icon: HomeIcon,
        path: '/dashboard',
    },
    {
        name: 'Użytkownicy',
        icon: UsersIcon,
        path: '/users',
    },
    {
        name: 'Osoby kontaktowe',
        icon: UsersIcon,
        path: '/persons',
    },
    {
        name: 'Gminy',
        icon: UsersIcon,
        path: '/municipalities',
    },
]
