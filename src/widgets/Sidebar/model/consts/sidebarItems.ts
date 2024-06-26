import HomeIcon from '@/shared/assets/icons/Home.vue'
import UsersIcon from '@/shared/assets/icons/Users.vue'

// TODO: change pathes

export const sidebarItems = [
    {
        name: 'Lista Leadów',
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
        name: 'Lista gmin',
        icon: UsersIcon,
        path: '/municipalities',
    },
    {
        name: 'Podsumowanie kampanii',
        icon: UsersIcon,
        path: '/campaign',
    },
]
