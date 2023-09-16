import { $api } from '@/shared/api/api'
import { useQuery } from 'vue-query'
import type { User } from '../types/user'

export const useOwners = () => {
    return useQuery(['users'], async () => {
        const response = await $api.post<User[]>('users')
        return response.data
    })
}
