import { $api } from '@/shared/api/api'
import { useQuery } from '@tanstack/vue-query'
import type { User } from '../types/user'

export const useOwners = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await $api.get<User[]>('users')

            return response.data
        },
        initialData: [],
    })
}
