import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'
import type { User } from '../../../Status/types/user'

export const useOwners = () => {
    return useQuery(
        ['users'],
        async () => {
            const response = await $api.get<User[]>('users')

            return response.data
        },
        {
            initialData: [],
        },
    )
}
